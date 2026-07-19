import type { RocketStatus } from './useLaunchControl'

export const fmt1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
export const fmt0 = (n: number) => Math.round(n).toString()

export function durationText(firedAt: number | null, endAt?: number | null) {
  if (!firedAt) return '00:00'
  const ms = (endAt || Date.now()) - firedAt
  const total = Math.max(0, Math.floor(ms / 1000))
  const mm = String(Math.floor(total / 60)).padStart(2, '0')
  const ss = String(total % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function badgeFor(status: RocketStatus) {
  if (status === 'TEST') return { text: 'TEST', bannerBg: 'var(--mantine-color-blue-0)', bannerText: 'var(--mantine-color-blue-9)' }
  if (status === 'ARME') return { text: 'ARMÉ', bannerBg: 'var(--mantine-color-yellow-6)', bannerText: '#fff' }
  return { text: 'TIRÉ', bannerBg: 'var(--mantine-color-red-6)', bannerText: '#fff' }
}
