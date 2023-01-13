import { StateCreator } from 'zustand'

export interface ThemeSlice {
  theme: string
  setTheme: () => void
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: localStorage.getItem('theme')
    ? JSON.stringify(localStorage.getItem('theme'))
    : 'dark',
  setTheme: () =>
    set((state) =>
      state.theme === 'dark'
        ? (localStorage.setItem('theme', 'light'), { theme: 'light' })
        : (localStorage.setItem('theme', 'dark'), { theme: 'dark' })
    ),
})
