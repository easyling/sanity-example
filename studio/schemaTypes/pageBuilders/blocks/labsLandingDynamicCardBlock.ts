import {defineArrayMember, defineField, defineType} from 'sanity'

import {Dropdowns} from '../../../dialogs/dropdowns'

export const LabsLandingDynamicCardBlock = defineType({
  name: 'labsLandingDynamicCardBlock',
  title: 'Dynamic Card Block',
  type: 'object',
  fields: [
    defineField({
      name: 'filter',
      title: 'Filter',
      description:
        'Chosing a category means that only articles that share that category will be displayed',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
      validation: (rule) => rule.max(1).error('Only one category at a time is currently supported'),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'dynamicCard',
          type: 'object',
          title: 'Type of Card',
          fields: [
            {
              name: 'cardType',
              type: 'string',
              options: {
                list: Dropdowns.DynamicCardOptions,
              },
            },
            {
              name: 'featuredSeries',
              title: 'Article Series',
              type: 'reference',
              to: [{type: 'series'}],
              hidden: ({parent}) => parent?.cardType !== 'featuredSeries',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      filters: 'filter',
      firstFilter: 'filter.0.title',
      cards: 'cards',
    },
    prepare({filters, firstFilter, cards}) {
      const hasFilters = filters ? Object.keys(filters).length > 0 : false
      const numberOfCards = cards ? Object.keys(cards).length : 0
      return {
        title: hasFilters ? `Filters: ${firstFilter}` : 'Filters: none',
        subtitle: numberOfCards > 0 ? `${numberOfCards} cards` : 'No cards included',
      }
    },
  },
})
