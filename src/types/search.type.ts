export interface UserInfo {
  displayName: string
  photoURL: string
  uid: string
  email: string
}

export interface SearchResultSlice {
  searchResults: UserInfo[]
  setResult: (result: UserInfo) => void
  clearResult: () => void
}
