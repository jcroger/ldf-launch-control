import { Box, Stack } from '@mantine/core'

export function LoadingScreen() {
  return (
    <Stack align="center" justify="center" gap={24} style={{ minHeight: '100dvh', background: '#fff', padding: 40 }}>
      <img
        src="/logo-lulu-aerospacial.webp"
        alt="Lulu Aerospacial"
        style={{ width: 260, height: 'auto', maxWidth: '80%', animation: 'lc-logo-zoom 2.6s ease-in-out infinite' }}
      />
      <Box style={{ width: 180, height: 6, borderRadius: 100, background: 'var(--mantine-color-gray-2)', overflow: 'hidden' }}>
        <Box style={{ width: '100%', height: '100%', background: 'var(--mantine-color-blue-6)', borderRadius: 100, transformOrigin: 'left', animation: 'lc-loading-fill 5s linear forwards' }} />
      </Box>
    </Stack>
  )
}
