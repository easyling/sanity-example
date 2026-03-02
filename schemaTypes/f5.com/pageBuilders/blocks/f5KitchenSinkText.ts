import {BlockContentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {trimBlockContentForPreview} from '../../../../utils/blockContent'

export const f5KitchenSinkText = defineType({
  name: 'f5KitchenSinkText',
  title: 'Text (all)',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text',
      type: 'f5KitchenSinkBlockContent',
    }),
  ],
  preview: {
    select: {
      content: NamingConstants.BLOCK_CONTENT,
    },
    prepare: ({content}) => {
      if (content && Array.isArray(content)) {
        return {
          title: trimBlockContentForPreview(content),
        }
      }
      return {
        title: 'Rich text',
      }
    },
  },
})
