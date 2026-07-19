import { Box } from '@mantine/core'

function urgencyColor(n: number) {
  if (n <= 2) return '#DC2626'
  if (n <= 5) return '#F59E0B'
  return 'var(--mantine-color-blue-6)'
}

export function RadialCountdown({ value, size }: { value: number; size: number }) {
  return (
    <Box
      key={value}
      style={{
        fontSize: size, fontWeight: 800, color: urgencyColor(value), lineHeight: 1,
        animation: 'cd-zoom-blast 1s ease-in',
      }}
    >
      {value}
    </Box>
  )
}
