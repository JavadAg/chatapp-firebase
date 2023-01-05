import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import AuthStateProvider from './context/AuthContext'
import useStore from './store/useStore'
import HomePage from './pages/HomePage'
import { auth } from './services/firebase'

function App() {
  const setCurrentUser = useStore((state) => state.setCurrentUser)
  const setStatus = useStore((state) => state.setStatus)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setStatus('authenticated')
      } else {
        setCurrentUser(null)
        setStatus('unauthenticated')
      }
    })

    return unsubscribe
  }, [])

  return (
    <AuthStateProvider>
      <HomePage />
    </AuthStateProvider>
  )
}

export default App
