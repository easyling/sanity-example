import type {PropsWithChildren} from 'react'
import React from 'react'

/**
 * Text alignment component for Sanity block decorators
 * Applies text-align CSS based on the alignment prop
 */
interface TextAlignProps extends PropsWithChildren {
  alignment?: 'left' | 'center' | 'right'
  mark?: string
  value?: string
  [key: string]: unknown
}

export const TextAlign: React.FC<TextAlignProps> = (props) => {
  const {children, alignment, mark, value} = props

  // Determine alignment from explicit prop, mark value, value prop, or fallback to left
  const alignValue = alignment || mark || value || 'left'
  const textAlign: 'left' | 'center' | 'right' =
    alignValue === 'center' || alignValue === 'right' ? alignValue : 'left'

  return <span style={{textAlign, display: 'inline-block', width: '100%'}}>{children}</span>
}

