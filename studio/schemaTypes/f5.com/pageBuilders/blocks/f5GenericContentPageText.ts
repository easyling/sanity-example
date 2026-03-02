import {BlockContentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {trimBlockContentForPreview} from '../../../../utils/blockContent'

export const f5GenericContentPageText = defineType({
  name: 'f5GenericContentPageText',
  title: 'Text (Generic Content Page)',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'sectionWidth',
      title: 'Section Width',
      description: 'Should the background of the container cover the whole page or be contained?',
      type: 'string',
      options: {
        list: [
          {title: 'Container', value: 'CONTAINER'},
          {title: 'Full Width', value: 'FULL_WIDTH'},
        ],
      },
      initialValue: 'CONTAINER',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Section Background Color',
      description: 'Choose the background color - (White Default)',
      type: 'string',
      options: {
        list: [
          {title: 'White (Default)', value: 'bg-white'},
          {title: 'Ash', value: 'bg-[var(--color-ash)]'},
          {title: 'Black', value: 'bg-black'},
          {title: 'Carbon', value: 'bg-carbon'},
        ],
      },
      initialValue: 'bg-white',
    }),
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text',
      type: 'f5GenericContentPageBlockContent',
    }),
  ],
  preview: {
    select: {
      content: NamingConstants.BLOCK_CONTENT,
    },
    prepare: ({content}) => {
      if (content && Array.isArray(content)) {
        const title = trimBlockContentForPreview(content)
        return {
          title: title,
        }
      }
      return {
        title: 'Rich text',
      }
    },
  },
})
