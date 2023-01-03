import React from 'react'

interface LogoProps {
  src: string
  alt: string
  size: string
}

const Logo = (props: LogoProps) => {
  const { src, alt, size } = props

  return <img className={`${size}`} src={src} alt={alt} />
}

export default Logo
