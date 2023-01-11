import { ChatSlice } from '@/types/chat.types'
import { SearchResultSlice } from '@/types/search.type'
import { SessionSlice } from '@/types/session.type'
import create from 'zustand'
import { createChatListsSlice } from './slices/ChatSlice'
import { createSearchResultSlice } from './slices/SearchResultSlice'
import { createSessionSlice } from './slices/SessionSlice'
import { createThemeSlice, ThemeSlice } from './slices/ThemeSlice'

const useStore = create<
  SessionSlice & SearchResultSlice & ChatSlice & ThemeSlice
>()((...a) => ({
  ...createSessionSlice(...a),
  ...createSearchResultSlice(...a),
  ...createChatListsSlice(...a),
  ...createThemeSlice(...a),
}))

export default useStore
