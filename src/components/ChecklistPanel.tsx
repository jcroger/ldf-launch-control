import { Box, Checkbox, Stack, Text } from '@mantine/core'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { CHECKLIST_ITEMS, type ChecklistState, type RocketKey } from '../useLaunchControl'

interface Props {
  rocketKey: RocketKey
  checklist: ChecklistState
  continuityOk: boolean
  radioOk: boolean
  onToggle: (item: keyof ChecklistState) => void
}

function Row({ children }: { children: ReactNode }) {
  return (
    <Box style={{
      background: 'var(--mantine-color-gray-1)', borderRadius: 12, padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      {children}
    </Box>
  )
}

export function ChecklistPanel({ rocketKey, checklist, continuityOk, radioOk, onToggle }: Props) {
  const radioApplicable = rocketKey === 'r2'

  return (
    <Stack gap={12}>
      <Text ta="center" fw={800} size="xs" style={{ letterSpacing: '.08em' }}>CHECKLIST</Text>
      <Stack gap={8}>
        {CHECKLIST_ITEMS.map(({ key, label }) => (
          <Row key={key}>
            <Checkbox
              checked={checklist[key]}
              onChange={() => onToggle(key)}
              size="sm"
            />
            <Text size="sm">{label}</Text>
          </Row>
        ))}

        <Row>
          <IconCircleCheckFilled size={20} color={continuityOk ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-gray-4)'} />
          <Text size="sm" style={{ flex: 1 }}>Continuité E-match</Text>
          <Text size="10px" c="dimmed" fw={700}>AUTO</Text>
        </Row>

        <Row>
          {radioApplicable ? (
            <IconCircleCheckFilled size={20} color={radioOk ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-gray-4)'} />
          ) : (
            <IconCircleCheckFilled size={20} color="var(--mantine-color-gray-3)" />
          )}
          <Text size="sm" style={{ flex: 1, opacity: radioApplicable ? 1 : 0.4 }}>
            Radio connectée{!radioApplicable && ' (N/A)'}
          </Text>
          <Text size="10px" c="dimmed" fw={700}>{radioApplicable ? 'AUTO' : ''}</Text>
        </Row>
      </Stack>
    </Stack>
  )
}
