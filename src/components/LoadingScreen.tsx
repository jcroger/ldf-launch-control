import { Box, Stack, Text } from '@mantine/core'

export function LoadingScreen() {
  return (
    <Stack align="center" justify="center" gap={16} style={{ minHeight: '100dvh', background: '#fff', padding: 40 }}>
      <Box style={{ width: 88, height: 88, borderRadius: 24, background: 'var(--mantine-color-blue-0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
          <path d="M28 3C37 10 40.5 23 37 38L28 44L19 38C15.5 23 19 10 28 3Z" fill="#12151a" />
          <path d="M28 3C32 8 34.5 14.5 35.5 22L20.5 22C21.5 14.5 24 8 28 3Z" fill="#155EEF" />
          <circle cx="28" cy="20" r="4" fill="#fff" />
          <path d="M19 38L11.5 47L19 45.2Z" fill="#12151a" />
          <path d="M37 38L44.5 47L37 45.2Z" fill="#12151a" />
          <path d="M23.5 43L21.5 53L28 46.5Z" fill="#155EEF" />
          <path d="M32.5 43L34.5 53L28 46.5Z" fill="#155EEF" />
        </svg>
      </Box>
      <Text fw={800} size="xl">LFD LAUNCH CONTROL</Text>
      <Text size="sm" c="dimmed">ESP32 · Point d'accès local</Text>
      <Box style={{ width: 120, height: 5, borderRadius: 100, background: 'var(--mantine-color-gray-2)', overflow: 'hidden', marginTop: 8 }}>
        <Box style={{ width: '100%', height: '100%', background: 'var(--mantine-color-blue-6)', borderRadius: 100, animation: 'lc-pulse 1.1s ease-in-out infinite' }} />
      </Box>
    </Stack>
  )
}
