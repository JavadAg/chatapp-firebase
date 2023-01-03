import { DocumentData } from 'firebase/firestore'
import React, { MouseEventHandler } from 'react'
import ListItem from '../Ui/List/ListItem'

interface UserListProps {
  data: DocumentData[]
  onClick?: MouseEventHandler<HTMLLIElement> | undefined
}

const UserList: React.FC<UserListProps> = ({ data, onClick }) => {
  console.log(data)
  return (
    <ul className='flex flex-col items-center self-start justify-start w-full h-full gap-6 p-2 bg-main-primary'>
      {data?.length > 0 &&
        data.map((item: DocumentData) => (
          <ListItem key={item.uid} data={item} onClick={onClick} />
        ))}
    </ul>
  )
}

export default UserList
