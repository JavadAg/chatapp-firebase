import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useState, useEffect } from 'react'
import { User } from 'firebase/auth'

interface AuthState {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user?: User
}

const AuthStateContext = createContext<AuthState>({
  status: 'loading',
})

export default function AuthStateProvider({
  children,
}: {
  children: JSX.Element
}) {
  const [authState, setAuthState] = useState<AuthState>({
    status: 'loading',
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          user,
          status: 'authenticated',
        })
      } else {
        setAuthState({
          status: 'unauthenticated',
        })
      }
    })
  }, [])

  return (
    <AuthStateContext.Provider value={authState}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuthStateContext = () => useContext(AuthStateContext)
