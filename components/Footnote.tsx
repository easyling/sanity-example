import React from 'react'

/**
 * Custom renderer for Footnote decorator in Sanity Studio
 */
interface FootnoteProps {
  children: React.ReactNode
}

const Footnote = (props: FootnoteProps) => {
  const {children} = props

  return (
    <span style={{verticalAlign: 'super', fontSize: '0.8em'}}>
      {children}
    </span>
  )
}

export default Footnote

