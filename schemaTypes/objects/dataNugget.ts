import {defineField, defineType} from 'sanity'

export const dataNugget = defineType({
  name: 'dataNugget',
  title: 'Data Nugget',
  type: 'object',
  fields: [
    defineField({
      name: 'primaryValue',
      title: 'Primary Value',
      description: 'The main value of the data nugget, usually a number',
      type: 'string',
      validation: (rule) => rule.required().error('All data nuggets must include a Primary Value'),
    }),
    defineField({
      name: 'secondaryText',
      title: 'Secondary Text',
      description: 'Text that gives context to the primary value',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'primaryValue',
      subtitle: 'secondaryText',
    },
    prepare({title, subtitle}) {
      return {
        title: title ?? 'No primary value',
        subtitle,
      }
    },
  },
})
