import {LinkIcon} from '@sanity/icons'
import type {Rule} from 'sanity'

export const f5PageDocuments = [{type: 'f5BlogPost'}, {type: 'f5BlogLanding'}]

const internalLink = {
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  icon: LinkIcon,
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: f5PageDocuments,
    },
    {
      name: 'anchor',
      title: 'Anchor',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          if (value) {
            if (!value.startsWith('#')) return 'Anchor must start with a #'
            return true
          }
          return true // Allows empty/undefined values
        }),
    },
  ],
}

export default internalLink
