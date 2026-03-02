import type {PropsWithChildren} from 'react'
import React from 'react'

/**
 * Separator component for Sanity block decorators
 * Renders a horizontal separator line
 */
export const Separator: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <span>
      {children}
      <hr style={{margin: '0.5em 0', border: 'none', borderTop: '1px solid #ccc'}} />
    </span>
  )
}

