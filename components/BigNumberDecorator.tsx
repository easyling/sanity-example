import React from 'react'

/**
 * Custom renderer for Big Number decorator in Sanity Studio
 */
interface BigNumberDecoratorProps {
  children: React.ReactNode
}

const BigNumberDecorator = (props: BigNumberDecoratorProps) => {
  const {children} = props

  return (
    <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>
      {children}
    </span>
  )
}

export default BigNumberDecorator

