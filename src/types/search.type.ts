import { ChatItem } from './chat.types'

export interface UserInfo {
  displayName: string
  photoURL: string
  uid: string
  email: string
}

export interface SearchResultSlice {
  searchResults: UserInfo | ChatItem | null
  setResult: (result: UserInfo | ChatItem) => void
  clearResult: () => void
}
