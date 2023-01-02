import React, { ReactElement } from 'react'

interface ButtonProps {
  name: string
  icon?: JSX.Element
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const { name, icon } = props

  return (
    <div>
      <button>{name}</button>
    </div>
  )
}

export default Button
