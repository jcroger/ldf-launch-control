import { RingProgress, Stack, Text } from '@mantine/core'

interface Props {
  size: number
  progress: number // 0..1
  holding: boolean
  helperText: string
  onDown: () => void
  onUp: () => void
}

export function ArmRing({ size, progress, holding, helperText, onDown, onUp }: Props) {
  const coreBg = holding ? 'var(--mantine-color-blue-9)' : 'var(--mantine-color-blue-6)'
  return (
    <Stack align="center" gap={10}>
      <div
        style={{ position: 'relative', width: size, height: size, touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <RingProgress
          size={size}
          thickness={7}
          roundCaps
          sections={[{ value: progress * 100, color: 'blue' }]}
          rootColor="var(--mantine-color-gray-3)"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div style={{
          position: 'absolute', inset: 8, borderRadius: '50%', background: coreBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          fontWeight: 800, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer',
        }}>ARMER</div>
      </div>
      <Text size="xs" c="dimmed" ta="center">{helperText}</Text>
    </Stack>
  )
}
