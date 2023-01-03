import React, { ReactElement } from 'react'

interface ButtonProps {
  name: string
  icon?: JSX.Element
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const { name, icon, onClick } = props

  return (
    <button
      className='h-8 px-2 bg-main-secondary rounded-2xl'
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Button
