import { Box, Text } from '@mantine/core'
import { IconAntenna, IconBolt } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import type { RocketStatus } from '../useLaunchControl'

function Card({ children, dimmed }: { children: ReactNode; dimmed?: boolean }) {
  return (
    <Box style={{
      flex: 1, background: dimmed ? 'var(--mantine-color-gray-1)' : '#fff',
      border: `1.5px solid ${dimmed ? 'var(--mantine-color-gray-4)' : 'var(--mantine-color-blue-6)'}`, borderRadius: 14,
      padding: '10px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 64,
      opacity: dimmed ? 0.7 : 1,
    }}>
      {children}
    </Box>
  )
}

interface Props {
  continuityOk: boolean
  radioOk: boolean
  status: RocketStatus
  radioApplicable?: boolean
}

export function StatusCards({ continuityOk, radioOk, status, radioApplicable = true }: Props) {
  const rssi = radioOk ? -52 : -91
  const cColor = continuityOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const rColor = radioApplicable ? (radioOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)') : 'var(--mantine-color-gray-5)'
  const modeText = status === 'TEST' ? 'TEST' : 'LAUNCH'
  const modeColor = status === 'TEST' ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-orange-7)'

  return (
    <Box style={{ display: 'flex', gap: 10 }}>
      <Card>
        <IconBolt size={20} color={cColor} fill={cColor} />
        <Text size="sm" fw={800} style={{ color: cColor }}>{continuityOk ? 'OK' : 'DÉFAUT'}</Text>
      </Card>
      <Card dimmed={!radioApplicable}>
        <IconAntenna size={20} color={rColor} />
        <Text size="sm" fw={800} style={{ color: rColor }}>{radioApplicable ? `${rssi} dBm` : '-'}</Text>
      </Card>
      <Card>
        <Text size="md" fw={800} style={{ color: modeColor }}>{modeText}</Text>
        <Text size="10px" fw={700} c="dimmed" style={{ letterSpacing: '.04em' }}>MODE</Text>
      </Card>
    </Box>
  )
}
