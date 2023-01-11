import { StateCreator } from 'zustand'

export interface ThemeSlice {
  theme: boolean
  setTheme: (theme: boolean) => void
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: true,
  setTheme: (theme) => set(() => ({ theme: !theme })),
})
