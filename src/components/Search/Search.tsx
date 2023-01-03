import { useState } from 'react'
import InputField from '../Ui/Input/InputField'
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/services/firebase'
import UserList from '../UserList/UserList'
import { useDebounce } from '@/hooks/useDebounce'

const Search = () => {
  const [searchResult, setSearchResult] = useState<DocumentData[]>([])

  const debouncedValue = useDebounce((value: string) => handleSearch(value))

  const handleSearch = async (value: string) => {
    debouncedValue

    if (value.length > 0) {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', value)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setSearchResult((current) => [...current, doc.data()])
      })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center flex-1 w-full '>
      <InputField
        type='search'
        id='search-input'
        placeholder='Search'
        onChange={(e) => debouncedValue(e.target.value)}
      />
      <div className='absolute top-0 left-0 right-0 flex flex-col items-start justify-start flex-1 w-full mt-12'>
        {searchResult.length > 0 ? (
          <UserList data={searchResult} onClick={() => setSearchResult([])} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Search
