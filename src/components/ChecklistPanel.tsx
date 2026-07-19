import { Box, Checkbox, Stack, Text } from '@mantine/core'
import type { ReactNode } from 'react'
import { CHECKLIST_ITEMS, type ChecklistState } from '../useLaunchControl'

interface Props {
  checklist: ChecklistState
  onToggle: (item: keyof ChecklistState) => void
}

function Row({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <Box
      onClick={onClick}
      style={{
        background: 'var(--mantine-color-gray-2)', border: '1px solid var(--mantine-color-gray-4)',
        borderRadius: 12, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </Box>
  )
}

export function ChecklistPanel({ checklist, onToggle }: Props) {
  return (
    <Stack gap={14}>
      <Text ta="center" fw={800} size="xs" style={{ letterSpacing: '.08em' }}>CHECKLIST</Text>
      <Stack gap={12}>
        {CHECKLIST_ITEMS.map(({ key, label }) => (
          <Row key={key} onClick={() => onToggle(key)}>
            <Checkbox
              checked={checklist[key]}
              onChange={() => onToggle(key)}
              onClick={(e) => e.stopPropagation()}
              size="md"
              styles={{ input: { cursor: 'pointer' } }}
            />
            <Text size="md">{label}</Text>
          </Row>
        ))}
      </Stack>
    </Stack>
  )
}
