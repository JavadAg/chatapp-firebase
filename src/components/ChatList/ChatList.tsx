import useStore from '@/store/useStore'
import UserList from '../UserList/UserList'

const ChatList = () => {
  const searchedUser = useStore((state) => state.searchResults)

  return (
    <div className='flex justify-center self-start items-center w-full'>
      <UserList data={searchedUser} />
    </div>
  )
}

export default ChatList
