import { SearchResultSlice } from '@/types/search.type'
import { SessionSlice } from '@/types/session.type'
import create from 'zustand'
import { createSearchResultSlice } from './slices/SearchResultSlice'
import { createSessionSlice } from './slices/SessionSlice'

const useStore = create<SessionSlice & SearchResultSlice>()((...a) => ({
  ...createSessionSlice(...a),
  ...createSearchResultSlice(...a),
}))

export default useStore
