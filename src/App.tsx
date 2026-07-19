import { Container, Stack, Title, Text, Badge } from '@mantine/core'

function App() {
  return (
    <Container size="xs" py="xl">
      <Stack align="center" gap="xs">
        <Badge color="blue" variant="light">
          En construction
        </Badge>
        <Title order={2}>LFD Launch Control</Title>
        <Text c="dimmed" size="sm" ta="center">
          Interface Mantine à venir. Le prototype visuel de référence est dans{' '}
          <code>prototype/</code>.
        </Text>
      </Stack>
    </Container>
  )
}

export default App
