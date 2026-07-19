import { Box, Button, Stack, Text, Title } from '@mantine/core'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { durationText } from '../format'
import { isChecklistReady, type ChecklistState, type RocketState } from '../useLaunchControl'
import { ArmRing } from './ArmRing'
import { ChecklistPanel } from './ChecklistPanel'
import { StatusCards } from './StatusCards'

interface Props {
  r1: RocketState
  continuityOk: boolean
  radioOk: boolean
  onBack: () => void
  onArmDown: () => void
  onArmUp: () => void
  onTir: () => void
  onCancel: () => void
  onToggleChecklist: (item: keyof ChecklistState) => void
}

export function Rocket1Screen({ r1, continuityOk, radioOk, onBack, onArmDown, onArmUp, onTir, onCancel, onToggleChecklist }: Props) {
  const ready = isChecklistReady('r1', r1.checklist, continuityOk, radioOk)

  return (
    <Stack gap={0} style={{ minHeight: '100dvh', background: '#f7f8fa' }}>
      <Box style={{ borderRadius: '0 0 28px 28px', background: '#fff', padding: '16px 20px 18px' }}>
        <Button variant="subtle" size="compact-sm" disabled={r1.status !== 'TEST'} onClick={onBack}
          styles={{ root: { paddingLeft: 0 } }}>‹ Sélection</Button>
        <Title order={4} mt={10}>Lulu Dynamic Falcon #1</Title>
      </Box>

      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, gap: 16, overflow: 'auto' }}>
        <StatusCards continuityOk={continuityOk} radioOk={radioOk} status={r1.status} />

        {r1.status !== 'TIRE' ? (
          <ChecklistPanel rocketKey="r1" checklist={r1.checklist} continuityOk={continuityOk} radioOk={radioOk} onToggle={onToggleChecklist} />
        ) : (
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '32px 16px', textAlign: 'center', background: '#fff', borderRadius: 20 }}>
            <IconCircleCheckFilled size={48} color="#16A34A" />
            <Title order={4}>Commande de tir envoyée</Title>
            <Text fw={700} c="dimmed">T+ {durationText(r1.firedAt)}</Text>
            <Text size="xs" c="dimmed" style={{ maxWidth: 230 }}>Aucune télémétrie disponible pour cette configuration.</Text>
          </Box>
        )}
      </Box>

      {r1.status !== 'TIRE' && (
        <Box style={{ padding: '0 20px 26px' }}>
          {r1.status === 'TEST' && (
            <ArmRing size={96} progress={r1.armProgress} holding={r1.holding} disabled={!ready}
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
