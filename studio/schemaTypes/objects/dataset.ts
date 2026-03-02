import {defineType} from 'sanity'

export const dataset = defineType({
  name: 'dataset',
  title: 'Dataset',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Dataset Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'data',
      title: 'Data Points (Comma-Separated)',
      type: 'string',
      description: 'Enter data points as a comma-separated list (e.g., "10,20,30").',
      validation: (Rule) => Rule.required(),
    },
  ],
})
