import { Box, Text } from '@mantine/core'
import { IconAntenna, IconBolt } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import type { RocketStatus } from '../useLaunchControl'

function Card({ children }: { children: ReactNode }) {
  return (
    <Box style={{
      flex: 1, background: '#fff', border: '1.5px solid var(--mantine-color-blue-6)', borderRadius: 14,
      padding: '10px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 64,
    }}>
      {children}
    </Box>
  )
}

export function StatusCards({ continuityOk, radioOk, status }: { continuityOk: boolean; radioOk: boolean; status: RocketStatus }) {
  const rssi = radioOk ? -52 : -91
  const cColor = continuityOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const rColor = radioOk ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
  const statusText = status === 'TEST' ? 'TEST' : status === 'ARME' ? 'ARMÉ' : 'TIRÉ'

  return (
    <Box style={{ display: 'flex', gap: 10 }}>
      <Card>
        <IconBolt size={20} color={cColor} fill={cColor} />
        <Text size="sm" fw={800} style={{ color: cColor }}>{continuityOk ? 'OK' : 'DÉFAUT'}</Text>
      </Card>
      <Card>
        <IconAntenna size={20} color={rColor} />
        <Text size="sm" fw={800} style={{ color: rColor }}>{rssi} dBm</Text>
      </Card>
      <Card>
        <Text size="md" fw={800} style={{ color: 'var(--mantine-color-dark-7)' }}>{statusText}</Text>
        {status === 'ARME' && (
          <Text size="10px" fw={700} c="orange.7" style={{ letterSpacing: '.04em' }}>LAUNCH MODE</Text>
        )}
      </Card>
    </Box>
  )
}
