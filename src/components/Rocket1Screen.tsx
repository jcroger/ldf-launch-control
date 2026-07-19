import { Box, Stack, Text, Title } from '@mantine/core'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { durationText } from '../format'
import { isChecklistReady, type ChecklistState, type RocketState } from '../useLaunchControl'
import { ArmRing } from './ArmRing'
import { ChecklistPanel } from './ChecklistPanel'
import { FireButton } from './FireButton'
import { RadialCountdown } from './RadialCountdown'
import { StatusCards } from './StatusCards'

interface Props {
  r1: RocketState
  continuityOk: boolean
  radioOk: boolean
  onArmDown: () => void
  onArmUp: () => void
  onTir: () => void
  onCancel: () => void
  onToggleChecklist: (item: keyof ChecklistState) => void
}

export function Rocket1Screen({ r1, continuityOk, radioOk, onArmDown, onArmUp, onTir, onCancel, onToggleChecklist }: Props) {
  const ready = isChecklistReady('r1', r1.checklist, continuityOk, radioOk)

  return (
    <Stack gap={0} style={{ minHeight: '100dvh', background: '#f7f8fa' }}>
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, gap: 16, overflow: 'auto' }}>
        <StatusCards continuityOk={continuityOk} radioOk={radioOk} status={r1.status} radioApplicable={false} />

        {r1.status === 'TEST' && (
          <ChecklistPanel checklist={r1.checklist} onToggle={onToggleChecklist} />
        )}
        {r1.status === 'TIRE' && (
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '32px 16px', textAlign: 'center', background: '#fff', borderRadius: 20 }}>
            <IconCircleCheckFilled size={48} color="#16A34A" />
            <Title order={4}>Commande de tir envoyée</Title>
            <Text fw={700} c="dimmed">T+ {durationText(r1.firedAt)}</Text>
            <Text size="xs" c="dimmed" style={{ maxWidth: 230 }}>Aucune télémétrie disponible pour cette configuration.</Text>
          </Box>
        )}

        {r1.status === 'TEST' && (
          <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 16 }}>
            <ArmRing size={150} progress={r1.armProgress} holding={r1.holding} disabled={!ready}
              helperText="Maintenir 3 secondes pour armer" onDown={onArmDown} onUp={onArmUp} />
          </Box>
        )}
        {r1.status === 'ARME' && r1.countdown === null && (
          <>
            <Box style={{ flex: 1 }} />
            <Stack align="center" gap={16} style={{ padding: '0 0 26px' }}>
              <Text size="lg" fw={800} ta="center" c="orange.8">Système armé : confirmer le tir</Text>
              <FireButton size={150} label="TIR" color="blue" spinning={false} onClick={onTir} />
            </Stack>
          </>
        )}
        {r1.countdown !== null && (
          <>
            <Box style={{ flex: 1 }} />
            <Stack align="center" gap={16} style={{ padding: '0 0 26px' }}>
              <RadialCountdown value={r1.countdown} size={140} />
              <Text size="sm" c="dimmed">Envoi de la commande de tir…</Text>
              <FireButton size={150} label="ANNULER" color="red" spinning={false} onClick={onCancel} />
            </Stack>
          </>
        )}
      </Box>
    </Stack>
  )
}
