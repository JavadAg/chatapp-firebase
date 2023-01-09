import Avatar from '@/assets/img/avatar-simple.png'
import { useState } from 'react'
import ChatScreen from '@/components/ChatScreen/ChatScreen'
import moment from 'moment'
import useStore from '@/store/useStore'
import { ChatItem } from '@/types/chat.types'
import { UserInfo } from '@/types/search.type'

const ListItem = ({ item }: { item: ChatItem | UserInfo }) => {
  const [isOpen, setIsOpen] = useState(false)
  const setActiveChat = useStore((state) => state.setActiveChat)

  const toggleChatScreen = () => {
    setIsOpen((current) => !current)
    setActiveChat(item)
  }

  return (
    <li
      onClick={() => toggleChatScreen()}
      className='flex items-center justify-between w-full gap-3'
    >
      {isOpen ? (
        <ChatScreen setIsOpen={setIsOpen} />
      ) : (
        <div className='flex items-center justify-between w-full gap-3'>
          <div className='flex items-center justify-center'>
            <img
              className='object-cover w-12 h-12 rounded-full'
              src={item.photoURL ?? Avatar}
              alt='avatar'
            />
          </div>
          <div className='flex flex-col flex-1'>
            <span className='text-sm font-semibold'>{item.displayName}</span>
            <span className='text-xs'>
              {'lastMessage' in item && item?.lastMessage}
            </span>
          </div>
          <div>
            <span>
              {'timestamp' in item &&
                moment(new Date(item?.timestamp?.toDate())).fromNow()}
            </span>
          </div>
        </div>
      )}
    </li>
  )
}

export default ListItem
