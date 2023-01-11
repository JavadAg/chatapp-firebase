import { SearchResultSlice } from '@/types/search.type'
import { StateCreator } from 'zustand'

export const createSearchResultSlice: StateCreator<SearchResultSlice> = (
  set
) => ({
  searchResults: null,
  setResult: (result) => {
    set(() => ({
      searchResults: result,
    }))
  },
  clearResult: () => set(() => ({ searchResults: null })),
})
