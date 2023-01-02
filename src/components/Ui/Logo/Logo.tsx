import React from 'react'

interface LogoProps {
  src: string
  alt: string
}

const Logo = (props: LogoProps) => {
  const { src, alt } = props

  return <img className='w-12' src={src} alt={alt} />
}

export default Logo
