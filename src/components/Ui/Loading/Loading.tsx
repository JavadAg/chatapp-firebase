import React from 'react'

const Loading = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-main-primary dark:bg-main-dark-primary'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='w-24 h-24 border-l-2 rounded-full border-purple-500/50 animate-spin' />
        <span className='text-text-primary dark:text-text-dark-primary'>
          {text}
        </span>
      </div>
    </div>
  )
}

export default Loading
