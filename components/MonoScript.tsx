import React from 'react'

/**
 * Custom renderer for Monospace/Code text decorator in Sanity Studio
 */
interface MonoScriptProps {
  children: React.ReactNode
}

const MonoScript = (props: MonoScriptProps) => {
  const {children} = props

  return (
    <code style={{fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '2px 4px'}}>
      {children}
    </code>
  )
}

export default MonoScript

