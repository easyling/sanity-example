import {BlockquoteIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'

export const pullquote = defineType({
  name: 'pullquote',
  type: 'object',
  title: 'Pullquote',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'size',
      type: 'string',
      options: {layout: 'radio', list: ['small', 'large'], direction: 'horizontal'},
      initialValue: 'small',
    }),
    defineField({
      name: NamingConstants.PRIMARY_TEXT,
      title: 'Quote text',
      description: 'Actual text of the quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: NamingConstants.SECONDARY_TEXT,
      title: 'Quote attribution',
      description: 'To whom the quote should be attributed',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      quote: NamingConstants.PRIMARY_TEXT,
      attribution: NamingConstants.SECONDARY_TEXT,
      subtitle: 'size',
    },
    prepare({quote, attribution, subtitle}) {
      return {
        title: `${quote.substring(0, 30)}...${attribution ? ` - ${attribution}` : ''}`,
        subtitle: `Size: ${subtitle}`,
      }
    },
  },
})

export default pullquote
