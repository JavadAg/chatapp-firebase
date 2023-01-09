import { db } from '@/services/firebase'
import useStore from '@/store/useStore'
import { ChatItem } from '@/types/chat.types'
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../Ui/Loading/Loading'
import ListItem from './ListItem/ListItem'

const ChatList = () => {
  const searchResults = useStore((state) => state.searchResults)
  const currentUser = useStore((state) => state.currentUser)
  const setChatList = useStore((state) => state.setChatList)
  const chatList = useStore((state) => state.chatList)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'chat-lists'),
      where('participants_id', 'array-contains', currentUser?.uid)
    )

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        let chatListArray: DocumentData[] = []
        querySnapshot.forEach((doc) => {
          chatListArray = [...chatListArray, doc.data()]
          setChatList(chatListArray as ChatItem[])
        })

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
  }, [currentUser?.uid])

  return (
    <div className='flex flex-col items-center self-start justify-start w-full gap-6 p-2 bg-main-primary'>
      {isLoading ? <Loading /> : ''}
      {searchResults.length > 0 || chatList.length > 0 ? (
        <ul className='flex flex-col items-center self-start justify-start w-full h-full gap-6 p-2 bg-main-primary'>
          {searchResults.length > 0
            ? searchResults.map((item) => (
                <ListItem key={item.uid} item={item} />
              ))
            : chatList.map((item) => <ListItem key={item.id} item={item} />)}
        </ul>
      ) : (
        <span className='w-full px-2 py-1 text-sm font-semibold text-center bg-main-secondary rounded-2xl'>
          No chat yet!
        </span>
      )}
    </div>
  )
}

export default ChatList
