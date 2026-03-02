import {StackCompactIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5RawHtml = defineType({
  name: 'f5RawHtml',
  title: 'Raw HTML Block',
  type: 'object',
  icon: StackCompactIcon,
  description: 'Add custom HTML code like tables for events',
  fields: [
    defineField({
      name: 'htmlCode',
      title: 'HTML Code',
      description: 'You can write or paste HTML code like tables for events listings',
      type: 'text',
      validation: (rule) => rule.required().error('HTML code is required'),
    }),
  ],
  preview: {
    select: {
      htmlCode: 'htmlCode',
    },
    prepare({htmlCode}) {
      const preview = htmlCode ? htmlCode.substring(0, 100) + (htmlCode.length > 100 ? '...' : '') : 'No HTML code'
      return {
        title: 'Raw HTML Block',
        subtitle: preview,
      }
    },
  },
})
