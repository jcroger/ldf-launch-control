import { Box, Text } from '@mantine/core'

function BoltIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill={color} />
    </svg>
  )
}

function RadioIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 20.5a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z" fill={color} />
      <path d="M8.3 14.8a5.2 5.2 0 017.4 0" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M5 11.5a9.8 9.8 0 0114 0" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function StatusChips({ continuityOk, radioOk }: { continuityOk: boolean; radioOk: boolean }) {
  const rssi = radioOk ? -52 : -91
  const cColor = continuityOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const cBg = continuityOk ? 'var(--mantine-color-green-0)' : 'var(--mantine-color-red-0)'
  const rColor = radioOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const rBg = radioOk ? 'var(--mantine-color-green-0)' : 'var(--mantine-color-red-0)'

  return (
    <>
      <Box style={{ flex: 1, background: cBg, borderRadius: 14, padding: '9px 6px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <BoltIcon color={cColor} />
        <Text size="10px" fw={800} style={{ color: cColor }}>{continuityOk ? 'OK' : 'DÉFAUT'}</Text>
      </Box>
      <Box style={{ flex: 1, background: rBg, borderRadius: 14, padding: '9px 6px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <RadioIcon color={rColor} />
        <Text size="10px" fw={800} style={{ color: rColor }}>{rssi} dBm</Text>
      </Box>
    </>
  )
}
