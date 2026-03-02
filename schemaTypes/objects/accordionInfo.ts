import {defineField, defineType} from 'sanity'

import {CommonWidgets} from '../../dialogs/commonWidgets'

export const accordionInfo = defineType({
  title: 'Accordion Info',
  name: 'accordionInfo',
  type: 'object',
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'Accordion title',
      validation: (rule) => rule.required().error('The Accordion must include a title'),
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'articleBlockContent',
      validation: (rule) => rule.required().error('The Accordion must include text'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
