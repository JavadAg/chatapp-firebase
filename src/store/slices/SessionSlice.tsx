import { SessionSlice } from '@/types/session.type'
import { StateCreator } from 'zustand'

export const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  status: 'loading',
  currentUser: null,
  setCurrentUser: (user) => set(() => ({ currentUser: user })),
  setStatus: (status) => set(() => ({ status })),
})
