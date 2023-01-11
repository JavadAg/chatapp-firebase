import React from 'react'
import cn from 'clsx'
interface ButtonProps {
  name?: string
  icon?: JSX.Element
  className?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const { name, className, icon, onClick } = props

  return (
    <button
      className={cn(
        'h-8 px-2 flex justify-center items-center bg-main-secondary rounded-2xl dark:bg-main-dark-secondary',
        className
      )}
      onClick={onClick}
    >
      {icon ?? name}
    </button>
  )
}

export default Button
