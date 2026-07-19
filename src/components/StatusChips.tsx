import { Box, Text } from '@mantine/core'
import { IconAntenna, IconBolt } from '@tabler/icons-react'

export function StatusChips({ continuityOk, radioOk }: { continuityOk: boolean; radioOk: boolean }) {
  const rssi = radioOk ? -52 : -91
  const cColor = continuityOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const cBg = continuityOk ? 'var(--mantine-color-green-0)' : 'var(--mantine-color-red-0)'
  const rColor = radioOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const rBg = radioOk ? 'var(--mantine-color-green-0)' : 'var(--mantine-color-red-0)'

  return (
    <>
      <Box style={{ flex: 1, background: cBg, borderRadius: 14, padding: '9px 6px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <IconBolt size={16} color={cColor} fill={cColor} />
        <Text size="10px" fw={800} style={{ color: cColor }}>{continuityOk ? 'OK' : 'DÉFAUT'}</Text>
      </Box>
      <Box style={{ flex: 1, background: rBg, borderRadius: 14, padding: '9px 6px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <IconAntenna size={16} color={rColor} />
        <Text size="10px" fw={800} style={{ color: rColor }}>{rssi} dBm</Text>
      </Box>
    </>
  )
}
