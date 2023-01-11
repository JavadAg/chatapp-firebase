import { db } from '@/services/firebase'
import useStore from '@/store/useStore'
import { ChatItem } from '@/types/chat.types'
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../Layout/Header/Header'
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
      where('participants', 'array-contains', {
        photoURL: currentUser?.photoURL,
        displayName: currentUser?.displayName,
        uid: currentUser?.uid,
      }),
      orderBy('timestamp', 'desc')
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
    <div className='flex flex-col items-center justify-start max-w-[50rem] w-full min-h-screen bg-main-primary md:w-2/4 dark:bg-main-dark-primary'>
      <Header />
      <div className='flex flex-col items-center self-start justify-start w-full gap-6 p-2'>
        {isLoading ? <Loading text='Loading Chatlist' /> : ''}
        {searchResults || chatList.length > 0 ? (
          <ul className='flex flex-col items-center justify-center w-full p-2 divide-y bg-main-secondary rounded-2xl dark:bg-main-dark-secondary dark:divide-neutral-800'>
            {searchResults ? (
              <ListItem item={searchResults} />
            ) : (
              chatList.map((item) => <ListItem key={item.id} item={item} />)
            )}
          </ul>
        ) : (
          <span className='w-full px-2 py-1 text-sm font-semibold text-center bg-main-secondary rounded-2xl md:text-base dark:bg-main-dark-secondary'>
            No chat yet!
          </span>
        )}
      </div>
    </div>
  )
}

export default ChatList
