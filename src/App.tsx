import AuthStateProvider from './context/AuthContext'
import HomePage from './pages/HomePage'

function App() {
  return (
    <AuthStateProvider>
      <HomePage />
    </AuthStateProvider>
  )
}

export default App
