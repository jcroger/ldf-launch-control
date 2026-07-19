import { Box, Stack, Text } from '@mantine/core'
import { IconCircleCheckFilled, IconRocket } from '@tabler/icons-react'
import { durationText, fmt0, fmt1 } from '../format'
import { isChecklistReady, type ChecklistState, type Rocket2State } from '../useLaunchControl'
import { ArmRing } from './ArmRing'
import { ChecklistPanel } from './ChecklistPanel'
import { FireButton } from './FireButton'
import { RadialCountdown } from './RadialCountdown'
import { StatusCards } from './StatusCards'

interface Props {
  r2: Rocket2State
  continuityOk: boolean
  radioOk: boolean
  onArmDown: () => void
  onArmUp: () => void
  onTir: () => void
  onCancel: () => void
  onToggleChecklist: (item: keyof ChecklistState) => void
}

function StatBlock({ label, value, unit, max }: { label: string; value: string; unit: string; max: string }) {
  return (
    <Box style={{ background: '#F7F7F5', borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Text size="11px" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</Text>
        <Text fw={800} size="28px" mt={4}>{value} <Text component="span" size="13px" fw={600} c="dimmed">{unit}</Text></Text>
      </Box>
      <Box style={{ textAlign: 'right' }}>
        <Text size="10px" c="dimmed" fw={700}>MAX</Text>
        <Text size="16px" fw={800} c="blue" mt={2}>{max}</Text>
      </Box>
    </Box>
  )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <Box style={{ background: '#F7F7F5', borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text size="12px" c="dimmed">{label}</Text>
      <Text fw={800} size="16px">{value}</Text>
    </Box>
  )
}

export function Rocket2Screen({ r2, continuityOk, radioOk, onArmDown, onArmUp, onTir, onCancel, onToggleChecklist }: Props) {
  const ready = isChecklistReady('r2', r2.checklist, continuityOk, radioOk)
  const showTelemetry = r2.phase === 'ascent'
  const showDescent = r2.phase === 'descent' || r2.phase === 'landed'

  return (
    <Stack gap={0} style={{ minHeight: '100dvh', background: '#f7f8fa' }}>
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 8px', gap: 12, overflow: 'auto' }}>
        <StatusCards continuityOk={continuityOk} radioOk={radioOk} status={r2.status} />

        {r2.status === 'TIRE' && (
          <Box style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#E7F7ED', borderRadius: 20, padding: '12px 14px' }}>
            <IconCircleCheckFilled size={18} color="#16A34A" />
            <Box style={{ flex: 1 }}>
              <Text size="12px" fw={800}>Commande de tir envoyée</Text>
              <Text size="11px" c="dimmed" mt={1}>T+ {durationText(r2.firedAt, r2.landedAt)}</Text>
            </Box>
          </Box>
        )}

        {r2.status === 'TEST' && (
          <ChecklistPanel checklist={r2.checklist} onToggle={onToggleChecklist} />
        )}

        {showTelemetry && (
          <Stack gap={10}>
            <StatBlock label="Vitesse" value={fmt0(r2.speed)} unit="m/s" max={fmt0(r2.speedMax)} />
            <StatBlock label="Accélération" value={fmt1(r2.accel)} unit="G" max={fmt1(r2.accelMax)} />
            <StatBlock label="Altitude" value={fmt0(r2.altitude)} unit="m" max={fmt0(r2.altitudeMax)} />
          </Stack>
        )}

        {showDescent && (
          <Stack gap={14}>
            <Box style={{ background: '#fff', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '22px 12px' }}>
              <Box style={{ position: 'relative', width: 140, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="140" height="70" viewBox="0 0 140 70" style={{ position: 'absolute', top: 0 }}>
                  <path d="M6 60C6 26 44 6 70 6C96 6 134 26 134 60" stroke="#12151a" strokeWidth={2.4} fill="none" strokeOpacity={0.55} strokeLinecap="round" />
                  <line x1="6" y1="60" x2="52" y2="98" stroke="#12151a" strokeWidth={1.6} strokeOpacity={0.45} />
                  <line x1="134" y1="60" x2="88" y2="98" stroke="#12151a" strokeWidth={1.6} strokeOpacity={0.45} />
                  <line x1="70" y1="6" x2="70" y2="98" stroke="#12151a" strokeWidth={1.6} strokeOpacity={0.3} />
                </svg>
                <IconRocket
                  size={34}
                  color="var(--mantine-color-blue-6)"
                  fill="var(--mantine-color-blue-6)"
                  style={{ position: 'absolute', top: 88, transform: `rotate(${fmt0(r2.roll)}deg)`, transition: 'transform 0.15s linear' }}
                />
              </Box>
              <Text size="36px" fw={800}>{fmt0(r2.altitude)} <Text component="span" size="15px" fw={600} c="dimmed">m</Text></Text>
              <Text size="12px" c="dimmed" fw={700}>{r2.phase === 'landed' ? 'Atterri · mission terminée' : 'Descente sous parachute'}</Text>
            </Box>
            <Stack gap={8}>
              <Text size="11px" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '.06em', padding: '0 4px' }}>Récap vol — valeurs max</Text>
              <StatRow label="Vitesse max" value={`${fmt0(r2.speedMax)} m/s`} />
              <StatRow label="Accélération max" value={`${fmt1(r2.accelMax)} G`} />
              <StatRow label="Altitude max (apogée)" value={`${fmt0(r2.altitudeMax)} m`} />
            </Stack>
          </Stack>
        )}

        {r2.status === 'TEST' && (
          <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 12 }}>
            <ArmRing size={130} progress={r2.armProgress} holding={r2.holding} disabled={!ready}
              helperText="Maintenir 3 secondes pour armer" onDown={onArmDown} onUp={onArmUp} />
          </Box>
        )}
        {r2.status === 'ARME' && r2.countdown === null && (
          <>
            <Box style={{ flex: 1 }} />
            <Stack align="center" gap={16} style={{ padding: '0 0 22px' }}>
              <Text size="lg" fw={800} ta="center" c="orange.8">Système armé : confirmer le tir</Text>
              <FireButton size={130} label="TIR" color="blue" spinning={false} onClick={onTir} />
            </Stack>
          </>
        )}
        {r2.countdown !== null && (
          <>
            <Box style={{ flex: 1 }} />
            <Stack align="center" gap={16} style={{ padding: '0 0 22px' }}>
              <RadialCountdown value={r2.countdown} size={140} />
              <Text size="sm" c="dimmed">Envoi de la commande de tir…</Text>
              <FireButton size={130} label="ANNULER" color="red" spinning={false} onClick={onCancel} />
            </Stack>
          </>
        )}
      </Box>
    </Stack>
  )
}
