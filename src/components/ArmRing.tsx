import { Box, RingProgress, Stack, Text } from '@mantine/core'

interface Props {
  size: number
  progress: number // 0..1
  holding: boolean
  helperText: string
  disabled?: boolean
  onDown: () => void
  onUp: () => void
}

export function ArmRing({ size, progress, holding, helperText, disabled, onDown, onUp }: Props) {
  const coreBg = disabled
    ? 'var(--mantine-color-gray-4)'
    : holding ? 'var(--mantine-color-blue-9)' : 'var(--mantine-color-blue-6)'
  const spinDuration = holding ? Math.max(0.35, 1.1 - progress * 0.8) : 1.1

  return (
    <Stack align="center" gap={10}>
      <div
        style={{ position: 'relative', width: size, height: size, touchAction: 'none', opacity: disabled ? 0.6 : 1 }}
        onPointerDown={disabled ? undefined : onDown}
        onPointerUp={disabled ? undefined : onUp}
        onPointerLeave={disabled ? undefined : onUp}
      >
        <RingProgress
          size={size}
          thickness={7}
          roundCaps
          sections={[{ value: progress * 100, color: disabled ? 'gray' : 'blue' }]}
          rootColor="var(--mantine-color-gray-3)"
          style={{ position: 'absolute', inset: 0 }}
        />
        {holding && !disabled && (
          <Box style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(21,94,239,0) 0deg, rgba(21,94,239,.5) 40deg, rgba(21,94,239,0) 90deg)',
            animation: `arm-sweep-spin ${spinDuration}s linear infinite`,
          }} />
        )}
        <div style={{
          position: 'absolute', inset: 8, borderRadius: '50%', background: coreBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          fontWeight: 800, fontSize: 13, textAlign: 'center', lineHeight: 1.2,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}>ARMER</div>
      </div>
      <Text size="xs" c="dimmed" ta="center">
        {disabled ? 'Complétez la checklist pour armer' : helperText}
      </Text>
    </Stack>
  )
}
