import { DocumentData } from 'firebase/firestore'
import Avatar from '@/assets/img/avatar-simple.png'
import { MouseEventHandler } from 'react'

const ListItem = ({
  data,
  onClick,
}: {
  data: DocumentData
  onClick: MouseEventHandler<HTMLLIElement> | undefined
}) => {
  console.log(data)
  return (
    <li
      onClick={onClick}
      className='flex items-center justify-between w-full gap-3'
    >
      <div>
        <img
          className='w-12 h-12 rounded-full'
          src={data.photoURL ?? Avatar}
          alt='avatar'
        />
      </div>

      <div className='flex flex-col flex-1'>
        <span className='text-sm font-semibold'>{data.displayName}</span>
        <span className='text-xs'>Hi there</span>
      </div>
      <div>
        <span>9:00</span>
      </div>
    </li>
  )
}

export default ListItem
