import { Box, Button, Group, Stack, Text, Title } from '@mantine/core'
import { badgeFor, durationText, fmt0, fmt1 } from '../format'
import type { Rocket2State } from '../useLaunchControl'
import { ArmRing } from './ArmRing'
import { StatusChips } from './StatusChips'

interface Props {
  r2: Rocket2State
  continuityOk: boolean
  radioOk: boolean
  onBack: () => void
  onArmDown: () => void
  onArmUp: () => void
  onTir: () => void
  onCancel: () => void
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

export function Rocket2Screen({ r2, continuityOk, radioOk, onBack, onArmDown, onArmUp, onTir, onCancel }: Props) {
  const b = badgeFor(r2.status)
  const showTelemetry = r2.phase === 'idle' || r2.phase === 'ascent'
  const showDescent = r2.phase === 'descent' || r2.phase === 'landed'

  return (
    <Stack gap={0} style={{ minHeight: '100dvh', background: '#f7f8fa' }}>
      <Box style={{ borderRadius: '0 0 28px 28px', background: b.bannerBg, padding: '16px 20px 18px' }}>
        <Button variant="subtle" size="compact-sm" disabled={r2.status !== 'TEST'} onClick={onBack}
          styles={{ root: { color: b.bannerText, paddingLeft: 0 } }}>‹ Sélection</Button>
        <Group gap={8} mt={10} align="center">
          <Title order={4} style={{ color: b.bannerText }}>Fusée 2</Title>
          <Text size="10px" fw={800} style={{ letterSpacing: '.04em', color: b.bannerText, background: 'rgba(255,255,255,0.28)', padding: '3px 9px', borderRadius: 20 }}>LDF2</Text>
        </Group>
        <Box style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <StatusChips continuityOk={continuityOk} radioOk={radioOk} />
          <Box style={{ flex: 'none', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.22)', borderRadius: 20, padding: '8px 12px' }}>
            <Text size="xs" fw={800} style={{ color: b.bannerText }}>{b.text}</Text>
          </Box>
        </Box>
      </Box>

      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 8px', gap: 12, overflow: 'auto' }}>
        {r2.status === 'TIRE' && (
          <Box style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#E7F7ED', borderRadius: 20, padding: '12px 14px' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" fill="#16A34A" />
              <path d="M6 10l2.6 2.6L14 7.4" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Box style={{ flex: 1 }}>
              <Text size="12px" fw={800}>Commande de tir envoyée</Text>
              <Text size="11px" c="dimmed" mt={1}>T+ {durationText(r2.firedAt, r2.landedAt)}</Text>
            </Box>
          </Box>
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
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 88, transform: `rotate(${fmt0(r2.roll)}deg)`, transition: 'transform 0.15s linear' }}>
                  <path d="M12 2C16 6 17.5 11 16.5 17L12 20L7.5 17C6.5 11 8 6 12 2Z" fill="var(--mantine-color-blue-6)" />
                  <circle cx="12" cy="9" r="1.6" fill="#fff" />
                </svg>
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
      </Box>

      {r2.status !== 'TIRE' && (
        <Box style={{ padding: '0 20px 22px' }}>
          {r2.status === 'TEST' && (
            <ArmRing size={88} progress={r2.armProgress} holding={r2.holding}
              helperText="Maintenir 3 secondes pour armer" onDown={onArmDown} onUp={onArmUp} />
          )}
          {r2.status === 'ARME' && r2.countdown === null && (
            <Stack gap={10}>
              <Text size="xs" fw={700} ta="center" c="orange.8">● Système armé — confirmez le tir</Text>
              <Button size="xl" radius="lg" onClick={onTir}>TIR</Button>
            </Stack>
          )}
          {r2.countdown !== null && (
            <Stack align="center" gap={10}>
              <Text style={{ fontSize: 50, fontWeight: 800, color: '#DC2626', lineHeight: 1, animation: 'lc-blink 1s steps(1) infinite' }}>{r2.countdown}</Text>
              <Text size="sm" c="dimmed">Envoi de la commande de tir…</Text>
              <Button fullWidth size="lg" radius="lg" variant="outline" color="red" onClick={onCancel}>ANNULER</Button>
            </Stack>
          )}
        </Box>
      )}
    </Stack>
  )
}
