import { Box, Group, Paper, Stack, Text } from '@mantine/core'
import type { RocketKey } from '../useLaunchControl'

function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C16 6 17.5 11 16.5 17L12 20L7.5 17C6.5 11 8 6 12 2Z" fill="var(--mantine-color-blue-6)" />
      <circle cx="12" cy="9" r="1.6" fill="#fff" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="9" height="15" viewBox="0 0 8 14">
      <path d="M1 1l6 6-6 6" stroke="#12151a" strokeOpacity={0.4} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SelectScreen({ onSelect }: { onSelect: (key: RocketKey) => void }) {
  return (
    <Stack gap={20} style={{ minHeight: '100dvh', background: '#f7f8fa', padding: '24px 20px' }}>
      <Box>
        <Text fw={700} size="lg">Sélection fusée</Text>
        <Text size="sm" c="dimmed" mt={2}>Choisissez la configuration à piloter</Text>
      </Box>
      <Stack gap={12}>
        <Paper radius={20} p={18} shadow="xs" onClick={() => onSelect('r1')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, minHeight: 80 }}>
          <Box style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--mantine-color-blue-0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <RocketIcon />
          </Box>
          <Box style={{ flex: 1 }}>
            <Text fw={800} size="md">LFD #1</Text>
            <Text size="sm" c="dimmed" mt={2}>Configuration standard</Text>
          </Box>
          <ChevronIcon />
        </Paper>
        <Paper radius={20} p={18} shadow="xs" onClick={() => onSelect('r2')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, minHeight: 80 }}>
          <Box style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--mantine-color-blue-0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <RocketIcon />
          </Box>
          <Box style={{ flex: 1 }}>
            <Group gap={8} align="center">
              <Text fw={800} size="md">LFD #2</Text>
              <Text size="10px" fw={800} style={{ letterSpacing: '.04em', color: 'var(--mantine-color-blue-6)', background: 'var(--mantine-color-blue-0)', padding: '3px 9px', borderRadius: 20 }}>LDF2</Text>
            </Group>
            <Text size="sm" c="dimmed" mt={2}>Avec avionique · télémétrie live</Text>
          </Box>
          <ChevronIcon />
        </Paper>
      </Stack>
    </Stack>
  )
}
