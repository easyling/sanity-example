import {DownloadIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

export const downloadButton = defineArrayMember({
  name: 'downloadButton',
  type: 'object',
  icon: DownloadIcon,
  title: 'Download Button',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'Downloadable Asset',
      type: 'file',
    }),
  ],
})

export default downloadButton
