import { ChatSlice } from '@/types/chat.types'
import { StateCreator } from 'zustand'

export const createChatListsSlice: StateCreator<ChatSlice> = (set) => ({
  chatList: [],
  setChatList: (result) => {
    set(() => ({
      chatList: result,
    }))
  },
  activeChat: null,
  setActiveChat: (item) => {
    set(() => ({
      activeChat: item,
    }))
  },
})
