import {defineField} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {withDataLayer} from '../../helpers/withDataLayer'
import {withSeo} from '../../helpers/withSeo'

export const f5BlogPillar = withDataLayer(
  withSeo({
    title: 'Blog Pillar',
    type: 'document',
    name: 'f5BlogPillar',
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
        type: 'array',
        name: 'featuredPosts',
        title: 'Featured Posts',
        description:
          'Select exactly 3 blogs to be featured on the pillar landing page. If left empty, recent posts from the same pillar will be automatically populated',
        of: [
          {
            type: 'reference',
            to: {type: 'f5BlogPost'},
            options: {
              disableNew: true,
              filter: ({document}) => {
                console.log({document})
                return {
                  filter: 'references($id)',
                  params: {id: document._id.split('drafts.')[1]},
                }
              },
            },
          },
        ],
        validation: (Rule) => Rule.min(3).max(3),
      }),
      defineField({
        type: 'array',
        name: 'featuredTags',
        title: 'Featured Tags',
        description:
          'Select tags that you want to use as filters on the pillar landing page. Max 20.',
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
      select: {
        title: 'title',
      },
      prepare: ({title}) => ({
        title: title ?? 'Untitled',
      }),
    },
  }),
)
