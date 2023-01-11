import { Timestamp } from 'firebase/firestore'
import { UserInfo } from './search.type'

type uid = string

export interface Participants {
  uid: uid
  photoURL: string
  displayName: string
}

export interface ChatItem {
  id: string
  participants: Participants[]
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
