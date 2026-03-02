import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CommonWidgets} from '../dialogs/commonWidgets'

export const series = defineType({
  name: 'series',
  title: 'Article Series',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      ...CommonWidgets.Title,
    }),
    defineField({
      ...CommonWidgets.Description,
    }),
  ],
})
