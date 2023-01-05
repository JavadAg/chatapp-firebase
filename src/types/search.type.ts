import { DocumentData } from 'firebase/firestore'

export interface SearchResultSlice {
  searchResults: DocumentData[] | []
  setResult: (result: DocumentData | []) => void
  clearResult: () => void
}
