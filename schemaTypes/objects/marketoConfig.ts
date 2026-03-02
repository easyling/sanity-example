import {defineField, defineType} from 'sanity'

export const marketoConfig = defineType({
  name: 'marketoConfig',
  title: 'Marketo Configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'jsFileLocation',
      title: 'JS file location',
      description: 'Location of forms2.min.js file',
      type: 'string',
    }),
    defineField({
      name: 'munchkinId',
      title: 'Munchkin ID',
      type: 'string',
    }),
  ],
})
