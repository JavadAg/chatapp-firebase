import { SearchResultSlice } from '@/types/search.type'
import { StateCreator } from 'zustand'

export const createSearchResultSlice: StateCreator<SearchResultSlice> = (
  set
) => ({
  searchResults: [],
  setResult: (result) => {
    set((state) => ({
      searchResults: [...state.searchResults, result],
    }))
  },
  clearResult: () => set(() => ({ searchResults: [] })),
})
