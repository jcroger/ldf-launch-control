import { LoadingScreen } from './components/LoadingScreen'
import { Rocket1Screen } from './components/Rocket1Screen'
import { Rocket2Screen } from './components/Rocket2Screen'
import { SelectScreen } from './components/SelectScreen'
import { useLaunchControl } from './useLaunchControl'

function App() {
  const lc = useLaunchControl()

  if (lc.screen === 'loading') return <LoadingScreen />
  if (lc.screen === 'select') return <SelectScreen onSelect={lc.selectRocket} />

  if (lc.screen === 'rocket1') {
    return (
      <Rocket1Screen
        r1={lc.r1}
        continuityOk={lc.continuityOk}
        radioOk={lc.radioOk}
        onBack={lc.goBack}
        onArmDown={() => lc.armDown('r1')}
        onArmUp={() => lc.armUp('r1')}
        onTir={() => lc.tirClick('r1')}
        onCancel={() => lc.cancelCountdown('r1')}
      />
    )
  }

  return (
    <Rocket2Screen
      r2={lc.r2}
      continuityOk={lc.continuityOk}
      radioOk={lc.radioOk}
      onBack={lc.goBack}
      onArmDown={() => lc.armDown('r2')}
      onArmUp={() => lc.armUp('r2')}
      onTir={() => lc.tirClick('r2')}
      onCancel={() => lc.cancelCountdown('r2')}
    />
  )
}

export default App
