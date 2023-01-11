import { useRef } from 'react'
import InputField from '../Ui/Input/InputField'
import { useDebounce } from '@/hooks/useDebounce'
import { toast } from 'react-toastify'
import useStore from '@/store/useStore'
import { UserInfo } from '@/types/search.type'
import { useFireStore } from '@/hooks/useFireStore'

const Search = () => {
  const searchTerm = useRef<HTMLInputElement>(null)
  const debounceFn = useDebounce((value: string) => handleSearch(value))
  const { handleGet } = useFireStore()
  const setSearchResult = useStore((state) => state.setResult)
  const clearResult = useStore((state) => state.clearResult)
  const chatList = useStore((state) => state.chatList)

  const handleSearch = async (value: string) => {
    if (value.length > 0) {
      handleGet('users', 'displayName', '==', value)
        .then((results) => {
          if (results.length > 0) {
            results.map((result) => {
              const chatExist = chatList.filter((chat) =>
                chat.participants.find(
                  (user) =>
                    user.uid === (result.data() as unknown as UserInfo).uid
                )
              )[0]
              if (chatExist) setSearchResult(chatExist)
              else {
                setSearchResult(result.data() as UserInfo)
              }
            })
          } else {
            toast.error('No results found')
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }

  const handleOnChange = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (searchTerm.current!.value.length == 0) clearResult()
    debounceFn(value)
  }

  return (
    <form className='flex flex-col items-center justify-center flex-1 w-full'>
      <InputField
        className='w-full px-2 text-sm outline-none h-9 rounded-3xl md:text-base focus:outline-purple-200 dark:focus:outline-purple-600 outline-offset-0 dark:bg-main-dark-secondary'
        type='search'
        id='search-input'
        placeholder='Search'
        ref={searchTerm}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </form>
  )
}

export default Search
