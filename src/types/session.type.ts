import { User } from 'firebase/auth'

export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface SessionSlice {
  status: SessionStatus
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  setStatus: (status: SessionStatus) => void
}
