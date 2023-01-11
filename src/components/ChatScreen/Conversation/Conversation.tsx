/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConversation, Participants } from '@/types/chat.types'
import SingleMessage from './SingleMessage'

const Conversations = ({
  messages,
  targetUser,
}: {
  messages: IConversation[]
  targetUser: Participants
}) => {
  return (
    <ul className='flex flex-col items-center justify-end flex-1 w-full gap-5 p-2 py-3 bg-main-secondary rounded-3xl dark:bg-main-dark-secondary'>
      {messages?.map((message) => (
        <SingleMessage
          key={message.id}
          message={message}
          targetUser={targetUser}
        />
      ))}
    </ul>
  )
}

export default Conversations
