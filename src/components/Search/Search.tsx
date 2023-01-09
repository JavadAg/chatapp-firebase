import { useRef } from 'react'
import InputField from '../Ui/Input/InputField'
import { useDebounce } from '@/hooks/useDebounce'
import { toast } from 'react-toastify'
import { useFirestore } from '@/hooks/useFireStore'
import useStore from '@/store/useStore'
import { UserInfo } from '@/types/search.type'

const Search = () => {
  const searchTerm = useRef<HTMLInputElement>(null)
  const debounceFn = useDebounce((value: string) => handleSearch(value))
  const { handleGet } = useFirestore()
  const setSearchResult = useStore((state) => state.setResult)
  const clearResult = useStore((state) => state.clearResult)

  const handleSearch = async (value: string) => {
    if (value.length > 0) {
      handleGet('users', 'displayName', '==', value)
        .then((results) => {
          if (results.length > 0) {
            results.map((result) => {
              setSearchResult(result.data() as UserInfo)
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
    <div className='flex flex-col items-center justify-center flex-1 w-full'>
      <InputField
        type='search'
        id='search-input'
        placeholder='Search'
        ref={searchTerm}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  )
}

export default Search
