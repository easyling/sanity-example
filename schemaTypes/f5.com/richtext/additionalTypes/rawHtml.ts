import {StackCompactIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

const rawHtml = defineArrayMember({
  name: 'rawHtml',
  type: 'object',
  title: 'Raw HTML',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'htmlCode',
      title: 'HTML Code',
      description: 'You can write or paste html code like tables',
      type: 'text',
    }),
  ],
})

export default rawHtml
