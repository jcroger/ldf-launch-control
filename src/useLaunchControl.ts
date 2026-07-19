import { useEffect, useRef, useState } from 'react'

export type RocketKey = 'r1' | 'r2'
export type RocketStatus = 'TEST' | 'ARME' | 'TIRE'
export type ScreenKey = 'loading' | 'select' | 'rocket1' | 'rocket2'

export interface RocketState {
  status: RocketStatus
  armProgress: number
  holding: boolean
  countdown: number | null
  firedAt: number | null
}

export interface Rocket2State extends RocketState {
  phase: 'idle' | 'ascent' | 'descent' | 'landed'
  simT: number
  speed: number
  accel: number
  altitude: number
  speedMax: number
  accelMax: number
  altitudeMax: number
  roll: number
  landedAt: number | null
}

const initialR1: RocketState = { status: 'TEST', armProgress: 0, holding: false, countdown: null, firedAt: null }
const initialR2: Rocket2State = {
  ...initialR1,
  phase: 'idle', simT: 0, speed: 0, accel: 0, altitude: 0,
  speedMax: 0, accelMax: 0, altitudeMax: 0, roll: 0, landedAt: null,
}

const BURNOUT = 2.6, APOGEE_T = 10, VBURN = 235, DESCENT_RATE = 5.5, HOLD_MS = 3000

export function useLaunchControl() {
  const [screen, setScreen] = useState<ScreenKey>('loading')
  const [continuityOk] = useState(true)
  const [radioOk] = useState(true)
  const [r1, setR1] = useState<RocketState>(initialR1)
  const [r2, setR2] = useState<Rocket2State>(initialR2)
  const [, bump] = useState(0)

  // mirrored so timers/rAF callbacks always read the latest value (no stale closures)
  const live = useRef({ r1, r2 })
  live.current.r1 = r1
  live.current.r2 = r2

  const timers = useRef({
    arm: { r1: null as number | null, r2: null as number | null },
    holding: { r1: false, r2: false },
    cd: { r1: null as ReturnType<typeof setInterval> | null, r2: null as ReturnType<typeof setInterval> | null },
    flight: null as ReturnType<typeof setInterval> | null,
    dur: null as ReturnType<typeof setInterval> | null,
  })

  useEffect(() => {
    const t = setTimeout(() => setScreen('select'), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const tm = timers.current
    return () => {
      (['r1', 'r2'] as RocketKey[]).forEach((k) => {
        if (tm.arm[k]) cancelAnimationFrame(tm.arm[k]!)
        if (tm.cd[k]) clearInterval(tm.cd[k]!)
      })
      if (tm.flight) clearInterval(tm.flight)
      if (tm.dur) clearInterval(tm.dur)
    }
  }, [])

  const setRocket = (key: RocketKey, patch: Partial<Rocket2State>) => {
    if (key === 'r1') setR1((r) => ({ ...r, ...patch }))
    else setR2((r) => ({ ...r, ...patch }) as Rocket2State)
  }

  const startDurationTick = () => {
    if (timers.current.dur) return
    timers.current.dur = setInterval(() => bump((x) => x + 1), 500)
  }

  const armDown = (key: RocketKey) => {
    timers.current.holding[key] = true
    const start = performance.now()
    setRocket(key, { holding: true, armProgress: 0 })
    const step = (now: number) => {
      if (!timers.current.holding[key]) return
      const p = Math.min(1, (now - start) / HOLD_MS)
      if (p >= 1) {
        timers.current.holding[key] = false
        setRocket(key, { holding: false, armProgress: 1, status: 'ARME' })
        return
      }
      setRocket(key, { armProgress: p })
      timers.current.arm[key] = requestAnimationFrame(step)
    }
    timers.current.arm[key] = requestAnimationFrame(step)
  }

  const armUp = (key: RocketKey) => {
    timers.current.holding[key] = false
    if (timers.current.arm[key]) cancelAnimationFrame(timers.current.arm[key]!)
    if (live.current[key].status === 'ARME') return
    setRocket(key, { holding: false, armProgress: 0 })
  }

  const stopCountdown = (key: RocketKey) => {
    if (timers.current.cd[key]) { clearInterval(timers.current.cd[key]!); timers.current.cd[key] = null }
  }

  const tirClick = (key: RocketKey) => {
    if (live.current[key].status !== 'ARME') return
    setRocket(key, { countdown: 5 })
    timers.current.cd[key] = setInterval(() => {
      const cur = live.current[key].countdown
      if (cur === null) return
      if (cur <= 1) {
        stopCountdown(key)
        setRocket(key, { countdown: null, status: 'TIRE', firedAt: Date.now() })
        if (key === 'r2') startFlight()
        startDurationTick()
      } else {
        setRocket(key, { countdown: cur - 1 })
      }
    }, 1000)
  }

  const cancelCountdown = (key: RocketKey) => {
    stopCountdown(key)
    setRocket(key, { countdown: null })
  }

  const startFlight = () => {
    setR2((s) => ({ ...s, phase: 'ascent', simT: 0 }))
    timers.current.flight = setInterval(() => {
      const s = live.current.r2
      if (s.phase === 'landed') return
      const dt = 0.28
      const t = s.simT + dt
      let speed: number, accel: number, altitude = s.altitude, phase: Rocket2State['phase'] = s.phase, roll = s.roll

      if (t <= BURNOUT) {
        speed = VBURN * Math.pow(t / BURNOUT, 0.75)
        accel = (9.4 * (1 - t / BURNOUT)) + 1.2
      } else if (t <= APOGEE_T) {
        const decelDur = APOGEE_T - BURNOUT
        speed = Math.max(0, VBURN * (1 - (t - BURNOUT) / decelDur))
        accel = -1.0
      } else {
        speed = 0; accel = 0
      }

      if (phase === 'ascent') {
        altitude = s.altitude + ((speed + (s.speed || 0)) / 2) * dt
        if (t > APOGEE_T || speed <= 0.2) { phase = 'descent'; altitude = s.altitudeMax || altitude }
      } else if (phase === 'descent') {
        altitude = Math.max(0, s.altitude - DESCENT_RATE * dt - Math.random() * 0.6)
        speed = DESCENT_RATE
        accel = (Math.random() - 0.5) * 0.3
        roll = (s.roll + (Math.random() - 0.5) * 40) % 360
        if (altitude <= 0.05) {
          phase = 'landed'; altitude = 0
          stopFlight()
          setR2((r) => ({ ...r, landedAt: Date.now() }))
        }
      }

      setR2((r) => ({
        ...r, simT: t, phase, speed, accel, altitude, roll,
        speedMax: Math.max(r.speedMax, speed),
        accelMax: Math.max(r.accelMax, accel),
        altitudeMax: Math.max(r.altitudeMax, altitude),
      }))
    }, 140)
  }
  const stopFlight = () => { if (timers.current.flight) { clearInterval(timers.current.flight); timers.current.flight = null } }

  const goBack = () => {
    const cur = screen === 'rocket1' ? r1.status : r2.status
    if (cur !== 'TEST') return
    setScreen('select')
  }

  const selectRocket = (key: RocketKey) => setScreen(key === 'r1' ? 'rocket1' : 'rocket2')

  return {
    screen, continuityOk, radioOk, r1, r2,
    armDown, armUp, tirClick, cancelCountdown, goBack, selectRocket,
  }
}
