import { Box, RingProgress } from '@mantine/core'

const PALETTE = {
  blue: { core: 'var(--mantine-color-blue-6)', root: 'var(--mantine-color-blue-2)', sweep: '21,94,239' },
  red: { core: '#DC2626', root: 'var(--mantine-color-red-2)', sweep: '220,38,38' },
} as const

interface Props {
  size: number
  label: string
  color?: keyof typeof PALETTE
  spinning?: boolean
  onClick: () => void
}

export function FireButton({ size, label, color = 'blue', spinning = true, onClick }: Props) {
  const c = PALETTE[color]

  return (
    <div style={{ position: 'relative', width: size, height: size, userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}>
      <RingProgress
        size={size}
        thickness={7}
        roundCaps
        sections={[{ value: 100, color }]}
        rootColor={c.root}
        style={{ position: 'absolute', inset: 0 }}
      />
      {spinning && (
        <Box style={{
          position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
          background: `conic-gradient(from 0deg, rgba(${c.sweep},0) 0deg, rgba(${c.sweep},.5) 40deg, rgba(${c.sweep},0) 90deg)`,
          animation: 'arm-sweep-spin 1.4s linear infinite',
        }} />
      )}
      <div
        onClick={onClick}
        style={{
          position: 'absolute', inset: 8, borderRadius: '50%', background: c.core,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          fontWeight: 800, fontSize: Math.round(size * 0.15), textAlign: 'center', lineHeight: 1.2,
          cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none',
        }}
      >
        {label}
      </div>
    </div>
  )
}
