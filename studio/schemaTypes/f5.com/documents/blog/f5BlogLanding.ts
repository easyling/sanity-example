import {defineField} from 'sanity'

import {withDataLayer} from '../../helpers/withDataLayer'
import {withSeo} from '../../helpers/withSeo'

export const f5BlogLanding = withDataLayer(
  withSeo({
    title: 'Blog Landing Page',
    type: 'document',
    name: 'f5BlogLanding',
    fields: [
      defineField({
        type: 'array',
        name: 'featuredPosts',
        title: 'Featured Posts',
        description:
          'Select exactly 3 blogs to be featured on the blog landing page. If left empty, 3 most recent posts will be automatically populated',
        of: [
          {
            type: 'reference',
            to: {type: 'f5BlogPost'},
            options: {disableNew: true},
          },
        ],
        validation: (Rule) => Rule.min(3).max(3),
      }),
      defineField({
        type: 'array',
        name: 'featuredPillars',
        title: 'Featured Pillars',
        description:
          'Select all the pillars that you would want as filters on the blog landing page.',
        of: [
          {
            type: 'reference',
            to: {type: 'f5BlogPillar'},
            options: {disableNew: true},
          },
        ],
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        type: 'array',
        name: 'featuredTags',
        title: 'Featured Tags',
        description:
          'Select tags that you want to use as filters on the blog landing page. Max 20.',
        of: [
          {
            type: 'reference',
            to: {type: 'category'},
            options: {disableNew: true},
          },
        ],
        validation: (Rule) => Rule.max(20),
      }),
    ],
    preview: {
      prepare: () => ({
        title: 'Blog Landing Page',
        // subtitle: 'Allows the editors to update the featured posts on the main blog landing page.',
      }),
    },
  }),
)
