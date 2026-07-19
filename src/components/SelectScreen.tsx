import { Box, Group, Paper, Stack, Text } from '@mantine/core'
import { IconChevronRight, IconRocket } from '@tabler/icons-react'
import type { RocketKey } from '../useLaunchControl'

function RocketIcon() {
  return <IconRocket size={24} color="var(--mantine-color-blue-6)" />
}

function ChevronIcon() {
  return <IconChevronRight size={16} color="#12151a" opacity={0.4} />
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
