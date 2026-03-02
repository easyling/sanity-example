import {UlistIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {Dropdowns} from '../../../../dialogs/dropdowns'
import {trimBlockContentForPreview} from '../../../../utils/blockContent'

export const f5IconText = defineType({
  name: 'f5IconText',
  title: 'Icon + Text',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'f5Icon',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      description:
        'Works best with F5 Basic and F5 Brand icons. Not recommended for Filled or Product icon sets.',
      type: 'string',
      initialValue: 'brand',
      options: {
        list: Dropdowns.F5IconColors,
      },
      hidden: ({parent}) => ['f5Filled', 'f5Product'].includes(parent?.icon?.provider),
    }),
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text',
      type: 'f5BaseBlockContent',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
      content: NamingConstants.BLOCK_CONTENT,
    },
    prepare: ({icon, content}) => {
      return {
        title: icon.name,
        subtitle: trimBlockContentForPreview(content),
      }
    },
  },
})
