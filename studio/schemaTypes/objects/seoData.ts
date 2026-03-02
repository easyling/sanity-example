import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {Dropdowns} from '../../dialogs/dropdowns'

export const seoData = defineType({
  name: 'seoData',
  title: 'SEO Data',
  type: 'object',
  fields: [
    defineField({
      name: 'robots',
      title: 'Meta Robots',
      description: 'Determines whether search engines will index this page and follow links',
      type: 'string',
      options: {
        list: Dropdowns.MetaRobots,
      },
    }),
    defineField({
      name: NamingConstants.DESCRIPTION,
      title: 'Meta Description',
      description: 'Short text that informs search engines of the page contents',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: NamingConstants.TAGS,
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
})
