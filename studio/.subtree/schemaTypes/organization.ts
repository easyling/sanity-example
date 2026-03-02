import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'

export const organization = defineType({
  name: 'organization',
  title: 'Organization',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: NamingConstants.TITLE,
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: NamingConstants.DESCRIPTION,
      title: 'Description',
      type: 'text',
    }),
    defineField({
      ...CommonWidgets.Image,
      title: 'Logo',
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      media: NamingConstants.IMAGE,
    },
    prepare({title, media}) {
      return {
        title: title,
        media: media,
      }
    },
  },
})
