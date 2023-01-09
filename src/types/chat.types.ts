import { Timestamp } from 'firebase/firestore'
import { UserInfo } from './search.type'

type uid = string

export interface ChatItem {
  id: string
  displayName: string
  photoURL: string
  uid: uid
  participants_id: uid[]
  lastMessage: string
  timestamp: Timestamp
}

export interface ChatSlice {
  chatList: ChatItem[]
  setChatList: (result: ChatItem[]) => void
  activeChat: ChatItem | UserInfo | null
  setActiveChat: (item: ChatItem | UserInfo | null) => void
}

export interface IConversation {
  id: string
  content: string
  img: string
  sender: uid
  timestamp: Timestamp
}
