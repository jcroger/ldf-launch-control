import { Box, Button, Stack, Text, Title } from '@mantine/core'
import { badgeFor, durationText } from '../format'
import type { RocketState } from '../useLaunchControl'
import { ArmRing } from './ArmRing'
import { StatusChips } from './StatusChips'

interface Props {
  r1: RocketState
  continuityOk: boolean
  radioOk: boolean
  onBack: () => void
  onArmDown: () => void
  onArmUp: () => void
  onTir: () => void
  onCancel: () => void
}

export function Rocket1Screen({ r1, continuityOk, radioOk, onBack, onArmDown, onArmUp, onTir, onCancel }: Props) {
  const b = badgeFor(r1.status)

  return (
    <Stack gap={0} style={{ minHeight: '100dvh', background: '#f7f8fa' }}>
      <Box style={{ borderRadius: '0 0 28px 28px', background: b.bannerBg, padding: '16px 20px 18px' }}>
        <Button variant="subtle" size="compact-sm" disabled={r1.status !== 'TEST'} onClick={onBack}
          styles={{ root: { color: b.bannerText, paddingLeft: 0 } }}>‹ Sélection</Button>
        <Title order={4} mt={10} style={{ color: b.bannerText }}>Fusée 1</Title>
        <Box style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <StatusChips continuityOk={continuityOk} radioOk={radioOk} />
          <Box style={{ flex: 'none', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.22)', borderRadius: 20, padding: '8px 12px' }}>
            <Text size="xs" fw={800} style={{ color: b.bannerText }}>{b.text}</Text>
          </Box>
        </Box>
      </Box>

      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, gap: 16, overflow: 'auto' }}>
        {r1.status !== 'TIRE' ? (
          <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#fff', borderRadius: 20 }}>
            <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
              <path d="M28 3C37 10 40.5 23 37 38L28 44L19 38C15.5 23 19 10 28 3Z" fill="var(--mantine-color-gray-3)" />
              <path d="M28 3C32 8 34.5 14.5 35.5 22L20.5 22C21.5 14.5 24 8 28 3Z" fill="var(--mantine-color-gray-4)" />
              <circle cx="28" cy="20" r="4" fill="#fff" />
            </svg>
            <Text size="sm" fw={700} style={{ color: 'var(--mantine-color-dark-4)', opacity: 0.6 }}>Prêt pour armement</Text>
          </Box>
        ) : (
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '32px 16px', textAlign: 'center', background: '#fff', borderRadius: 20 }}>
            <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="24" fill="#E7F7ED" />
              <path d="M16 27l7 7 13-15" stroke="#16A34A" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Title order={4}>Commande de tir envoyée</Title>
            <Text fw={700} c="dimmed">T+ {durationText(r1.firedAt)}</Text>
            <Text size="xs" c="dimmed" style={{ maxWidth: 230 }}>Aucune télémétrie disponible pour cette configuration.</Text>
          </Box>
        )}
      </Box>

      {r1.status !== 'TIRE' && (
        <Box style={{ padding: '0 20px 26px' }}>
          {r1.status === 'TEST' && (
            <ArmRing size={96} progress={r1.armProgress} holding={r1.holding}
              helperText="Maintenir 3 secondes pour armer" onDown={onArmDown} onUp={onArmUp} />
          )}
          {r1.status === 'ARME' && r1.countdown === null && (
            <Stack gap={10}>
              <Text size="xs" fw={700} ta="center" c="orange.8">● Système armé — confirmez le tir</Text>
              <Button size="xl" radius="lg" onClick={onTir}>TIR</Button>
            </Stack>
          )}
          {r1.countdown !== null && (
            <Stack align="center" gap={12}>
              <Text style={{ fontSize: 54, fontWeight: 800, color: '#DC2626', lineHeight: 1, animation: 'lc-blink 1s steps(1) infinite' }}>{r1.countdown}</Text>
              <Text size="sm" c="dimmed">Envoi de la commande de tir…</Text>
              <Button fullWidth size="lg" radius="lg" variant="outline" color="red" onClick={onCancel}>ANNULER</Button>
            </Stack>
          )}
        </Box>
      )}
    </Stack>
  )
}
