/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { db } from '@/services/firebase'
import useStore from '@/store/useStore'
import { combineIds } from '@/utils/combineIds'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Conversation from './Conversation/Conversation'
import Avatar from '@/assets/img/avatar-simple.png'
import { IConversation } from '@/types/chat.types'
import Message from '../Form/SendMessage/SendMessage'

const ChatScreen = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const currentUser = useStore((state) => state.currentUser)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<IConversation[]>([])
  const activeChat = useStore((state) => state.activeChat)
  const setActiveChat = useStore((state) => state.setActiveChat)
  const conversationId = combineIds(currentUser!.uid, activeChat!.uid)

  useEffect(() => {
    if ('lastMessage' in activeChat!) {
      const unsub = onSnapshot(
        doc(db, 'conversations', conversationId),
        (doc) => {
          setMessages(doc.data()!.messages)
          setIsLoading(false)
        },
        (error) => {
          toast.error(error.code)
          setIsLoading(false)
        }
      )

      return () => {
        unsub()
      }
    }
  }, [activeChat])

  const handleCloseChat = () => {
    setActiveChat(null)
    setIsOpen((current) => !current)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='absolute inset-0 z-10 flex flex-col items-center justify-between w-full h-screen gap-3 bg-main-secondary'
    >
      <div className='flex items-center justify-between w-full bg-blue-300'>
        <button onClick={() => handleCloseChat()}>close</button>
        <div className='flex items-center justify-center'>
          <span>{activeChat!.displayName}</span>
          <img
            className='object-cover w-12 h-12 rounded-full'
            src={activeChat!.photoURL ?? Avatar}
            alt='avatar'
          />
        </div>
      </div>
      {!isLoading && 'lastMessage' in activeChat! ? (
        <Conversation messages={messages} />
      ) : (
        ''
      )}
      <Message conversationId={conversationId} />
    </div>
  )
}

export default ChatScreen
