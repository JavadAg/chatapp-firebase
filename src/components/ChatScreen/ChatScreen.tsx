import { db } from '@/services/firebase'
import useStore from '@/store/useStore'
import { combineIds } from '@/utils/combineIds'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Conversation from './Conversation/Conversation'
import Avatar from '@/assets/img/avatar-simple.png'
import { IConversation, Participants } from '@/types/chat.types'
import SendMessage from '../Form/SendMessage/SendMessage'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import Loading from '../Ui/Loading/Loading'
import Button from '../Ui/Button/Button'
import { RiArrowLeftLine } from 'react-icons/ri'
import { UserInfo } from '@/types/search.type'

const ChatScreen = () => {
  const currentUser = useStore((state) => state.currentUser)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<IConversation[]>([])
  const activeChat = useStore((state) => state.activeChat)
  const setActiveChat = useStore((state) => state.setActiveChat)

  const targetUser: UserInfo | Participants =
    activeChat && 'participants' in activeChat && currentUser
      ? activeChat.participants.filter(
          (user) => user.uid !== currentUser.uid
        )[0]
      : (activeChat as UserInfo)

  const conversationId = combineIds(currentUser!.uid, targetUser?.uid)

  useEffect(() => {
    if (activeChat && 'lastMessage' in activeChat) {
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
  }

  let boxVariants = {}
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    boxVariants = {
      initial: {
        x: -1000,
      },
      animate: { x: 0 },
      exit: { x: -1000 },
    }
  } else {
    boxVariants = {
      initial: {
        opacity: 0,
      },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
  }

  return (
    <AnimatePresence>
      <LayoutGroup>
        {activeChat ? (
          <motion.div
            key='drawer'
            variants={boxVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.2, type: 'tween' }}
            className='absolute inset-0 z-10 flex flex-col items-center justify-between h-screen min-h-full gap-3 p-2 overflow-y-auto bg-main-primary md:relative md:w-2/4 dark:bg-main-dark-primary'
          >
            <motion.div className='sticky top-0 flex items-center justify-between w-full p-1 border bg-main-secondary rounded-3xl border-main-primary dark:bg-main-dark-secondary dark:border-main-dark-primary'>
              <Button
                className='w-8 text-lg text-white duration-200 bg-purple-300 rounded-full hover:bg-purple-400 md:w-9 md:h-9 dark:bg-purple-500/50 dark:hover:bg-purple-600/50'
                onClick={() => handleCloseChat()}
                icon={<RiArrowLeftLine />}
              />
              <div className='flex items-center self-start justify-center gap-1'>
                <span className='text-sm font-bold md:text-base'>
                  {targetUser.displayName}
                </span>
                <div className='flex items-center justify-center w-8 h-8 rounded-full md:w-9 md:h-9'>
                  <img
                    className='object-cover w-8 h-8 rounded-full md:w-9 md:h-9'
                    src={targetUser.photoURL ?? Avatar}
                    alt='avatar'
                  />
                </div>
              </div>
            </motion.div>
            {'lastMessage' in activeChat! ? (
              isLoading ? (
                <Loading text='Loading Conversation' />
              ) : (
                <Conversation messages={messages} targetUser={targetUser} />
              )
            ) : (
              <div className='flex flex-col items-center justify-end flex-1 w-full gap-5 p-2 py-3 bg-main-secondary rounded-3xl dark:bg-main-dark-secondary'>
                <span className='flex flex-col items-center justify-center flex-1 h-screen font-semibold text-center'>
                  No conversation here!
                </span>
              </div>
            )}
            <SendMessage
              conversationId={conversationId}
              targetUser={targetUser}
            />
          </motion.div>
        ) : (
          <motion.div
            key='emptyChat'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, type: 'tween' }}
            className='z-10 items-center justify-center hidden min-h-screen bg-purple-100 md:flex md:w-2/4 dark:bg-main-dark-secondary'
          >
            <span className='hidden font-bold md:block'>
              Select a chat to start messaging
            </span>
          </motion.div>
        )}
      </LayoutGroup>
    </AnimatePresence>
  )
}

export default ChatScreen
