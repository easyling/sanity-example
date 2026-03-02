import {LaunchIcon} from '@sanity/icons'
import React from 'react'

/**
 * Custom renderer for external link annotations in Sanity Studio
 */
interface ExternalLinkRendererProps {
  children: React.ReactNode
  value?: {
    href?: string
  }
}

const ExternalLinkRenderer = (props: ExternalLinkRendererProps) => {
  const {children, value} = props

  return (
    <span style={{color: '#0066cc'}}>
      <LaunchIcon style={{display: 'inline', marginRight: '2px'}} />
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{textDecoration: 'underline'}}
      >
        {children}
      </a>
    </span>
  )
}

export default ExternalLinkRenderer

