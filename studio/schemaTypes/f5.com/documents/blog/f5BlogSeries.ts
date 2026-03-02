import {defineField} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {withDataLayer} from '../../helpers/withDataLayer'
import {withSeo} from '../../helpers/withSeo'

export const f5BlogSeries = withDataLayer(
  withSeo({
    title: 'Blog Series',
    type: 'document',
    name: 'f5BlogSeries',
    fields: [
      defineField({
        name: NamingConstants.TITLE,
        type: 'string',
        title: 'Title',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: NamingConstants.SLUG,
        title: 'Slug',
        type: 'slug',
        options: {
          source: NamingConstants.TITLE,
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: NamingConstants.DESCRIPTION,
        title: 'Description',
        type: 'text',
        description:
          'Short blurb about the series that will show up at the start of each blog from the series',
        rows: 3,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        type: 'array',
        name: 'featuredPosts',
        title: 'Posts',
        description: 'Select all the blogs and arrange them in order you want it within the series',
        of: [
          {
            type: 'reference',
            to: {type: 'f5BlogPost'},
            options: {disableNew: true},
          },
        ],
        validation: (Rule) => Rule.min(3),
      }),
    ],
    preview: {
      select: {
        title: 'title',
      },
      prepare: ({title}) => ({
        title: title ?? 'Untitled',
      }),
    },
  }),
)
