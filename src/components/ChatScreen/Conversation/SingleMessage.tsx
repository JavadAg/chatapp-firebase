/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConversation, Participants } from '@/types/chat.types'
import { useEffect, useRef } from 'react'
import cn from 'clsx'
import moment from 'moment'
import useStore from '@/store/useStore'

const SingleMessage = ({
  message,
  targetUser,
}: {
  message: IConversation
  targetUser: Participants
}) => {
  const currentUser = useStore((state) => state.currentUser)
  const messageRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [message])

  const user = message.sender === currentUser?.uid ? currentUser : targetUser

  return (
    <li
      ref={messageRef}
      key={message.id}
      className={cn(
        'flex items-center gap-1',
        user.uid === currentUser!.uid
          ? 'self-end flex-row-reverse'
          : 'self-start'
      )}
    >
      {user.uid !== currentUser!.uid && (
        <div className='w-10 h-10 rounded-full bg-main-dark-primary'>
          <img
            className='object-cover h-10 rounded-full min-w-[2.5rem] w-10'
            src={user.photoURL!}
            alt='avatar'
          />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-center gap-2',
          user.uid === currentUser?.uid
            ? 'bg-purple-200 rounded-b-2xl rounded-tl-2xl px-5 py-2 dark:bg-purple-700/50'
            : 'bg-main-primary rounded-t-2xl rounded-br-2xl px-5 py-2 dark:bg-main-dark-primary',
          (message.content.length > 10 || message.img) && 'flex-col gap-0'
        )}
      >
        <div className='flex flex-col items-start justify-center max-w-full gap-1'>
          {message.img && (
            <img
              className='object-contain rounded-md'
              src={message.img}
              alt='chat'
            />
          )}
          <span className='text-sm break-words break-all md:text-base'>
            {message.content}
          </span>
        </div>
        <span className='self-end text-xs text-text-secondary/80'>
          {moment(new Date(message.timestamp.toDate())).fromNow()}
        </span>
      </div>
    </li>
  )
}

export default SingleMessage
