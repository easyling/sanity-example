import {DocumentTextIcon} from '@sanity/icons'
import type {TypedObject} from 'sanity'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'

export const labsLandingTextBlock = defineType({
  name: 'labsLandingTextBlock',
  type: 'object',
  fields: [
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text Content',
      type: 'labsBlockContent',
      validation: (rule) => rule.required().error('Text blocks must contain text content.'),
    }),
  ],
  preview: {
    select: {
      blocks: 'content',
    },
    prepare(value) {
      const block = (value.blocks || []).find((block: TypedObject) => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter((child: TypedObject) => child._type === 'span')
              .map((span: TypedObject) => span.text)
              .join('')
          : 'No title',
        media: DocumentTextIcon,
      }
    },
  },
})
