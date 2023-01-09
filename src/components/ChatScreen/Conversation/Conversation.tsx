/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useStore from '@/store/useStore'
import { ChatItem, IConversation } from '@/types/chat.types'
import cn from 'clsx'
import moment from 'moment'

const Conversations = ({ messages }: { messages: IConversation[] }) => {
  const activeChat = useStore((state) => state.activeChat) as ChatItem
  const currentUser = useStore((state) => state.currentUser)
  return (
    <div className='flex flex-col items-center justify-end flex-1 w-full gap-5 bg-main-secondary'>
      {messages?.map((message) => {
        const user =
          message.sender === currentUser?.uid ? currentUser : activeChat
        return (
          <div
            className={cn(
              'flex items-center gap-1',
              user.uid === currentUser?.uid
                ? 'self-end flex-row-reverse'
                : 'self-start'
            )}
            key={message.id}
          >
            {user.uid !== currentUser!.uid && (
              <img
                className='object-cover w-12 h-12 rounded-full'
                src={user.photoURL!}
                alt=''
              />
            )}
            <div
              className={cn(
                'flex items-center justify-center gap-2',
                user.uid === currentUser?.uid
                  ? 'bg-purple-300 rounded-b-2xl rounded-tl-2xl px-5 py-2'
                  : 'bg-purple-100 rounded-t-2xl rounded-br-2xl px-5 py-2',
                (message.content.length > 10 || message.img) && 'flex-col gap-0'
              )}
            >
              <div className='flex flex-col items-center justify-center'>
                {message.img && (
                  <img className='rounded-md' src={message.img} alt='chat' />
                )}
                <span>{message.content}</span>
              </div>

              <span className='self-end text-xs text-text-secondary/80'>
                {moment(new Date(message.timestamp.toDate())).fromNow()}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Conversations
