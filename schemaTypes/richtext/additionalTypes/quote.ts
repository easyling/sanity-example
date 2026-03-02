import {BlockquoteIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'

export const quote = defineArrayMember({
  name: 'quote',
  type: 'object',
  title: 'Pullquote',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: NamingConstants.PRIMARY_TEXT,
      title: 'Quote text',
      description: 'Actual text of the quote',
      type: 'text',
    }),
    defineField({
      name: NamingConstants.SECONDARY_TEXT,
      title: 'Quote attribution',
      description: 'To whom the quote should be attributed',
      type: 'string',
    }),
    defineField({
      name: NamingConstants.IMAGE,
      title: 'Background Image',
      description: 'Image to use as a background to this block of text',
      type: 'image',
    }),
  ],
})

export default quote
