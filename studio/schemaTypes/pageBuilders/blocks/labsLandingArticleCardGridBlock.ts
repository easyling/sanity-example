import {DashboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'

export const labsLandingArticleCardGridBlock = defineType({
  name: 'labsLandingArticleCardGridBlock',
  title: 'Article Card Grid',
  type: 'object',
  fields: [
    defineField({
      name: NamingConstants.TITLE,
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'filter',
      title: 'Filter',
      description: 'Only articles that share all of these tags will be listed in the grid',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
    }),
    defineField({
      name: 'variation',
      title: 'Variation',
      description:
        'Choose how much information will be displayed in the cards. May also affect how many cards are displayed at once',
      type: 'string',
      options: {
        list: [
          {
            title: 'Title only',
            value: 'title-only',
          },
          {
            title: 'Title + Abstract',
            value: 'title-abstract',
          },
        ],
      },
      validation: (rule) => rule.required().error('You must select a variation'),
    }),
  ],
  preview: {
    select: {
      variation: 'variation',
      filter: 'filter.0.title',
    },
    prepare(value) {
      return {
        title: `Article Card Grid: ${value.variation === 'title-only' ? 'Title only' : 'Title + Abstract'}`,
        subtitle: value.filter ? `Category: ${value.filter}` : 'No filter selected',
        media: DashboardIcon,
      }
    },
  },
})
