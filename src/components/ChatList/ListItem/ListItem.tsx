import Avatar from '@/assets/img/avatar-simple.png'
import moment from 'moment'
import useStore from '@/store/useStore'
import { ChatItem, Participants } from '@/types/chat.types'
import { UserInfo } from '@/types/search.type'

const ListItem = ({ item }: { item: ChatItem | UserInfo }) => {
  const setActiveChat = useStore((state) => state.setActiveChat)
  const currentUser = useStore((state) => state.currentUser)

  const targetUser: UserInfo | Participants =
    'participants' in item
      ? item.participants.filter((user) => user.uid !== currentUser!.uid)[0]
      : (item as UserInfo)

  const toggleChatScreen = () => {
    setActiveChat(item)
  }

  return (
    <li className='flex items-center justify-between w-full gap-3 py-2'>
      <div
        onClick={() => toggleChatScreen()}
        className='flex items-center justify-between w-full gap-3 cursor-pointer'
      >
        <div className='flex items-center justify-center gap-3'>
          <div className='flex items-center justify-center w-12 h-12 rounded-full'>
            <img
              className='object-cover w-12 h-12 rounded-full'
              src={targetUser.photoURL ?? Avatar}
              alt='avatar'
            />
          </div>
          <div className='flex flex-col max-w-[30vw]'>
            <span className='text-sm font-semibold md:text-base'>
              {targetUser.displayName}
            </span>
            <span className='text-xs truncate text-text-secondary md:text-sm dark:text-text-dark-secondary'>
              {'lastMessage' in item && item?.lastMessage}
            </span>
          </div>
        </div>

        <div>
          <span className='text-xs text-text-secondary/80'>
            {'timestamp' in item &&
              moment(new Date(item?.timestamp?.toDate())).fromNow()}
          </span>
        </div>
      </div>
    </li>
  )
}

export default ListItem
