import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CompoundNames, NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'
import {Dropdowns} from '../dialogs/dropdowns'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'article', title: 'Article Information', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      ...CommonWidgets.Slug,
      options: {
        source: CompoundNames.ARTICLE_TITLE,
        maxLength: 96,
      },
    }),
    defineField({
      name: 'source',
      title: 'Blog Source',
      description: 'Which set of blog articles this post belongs to',
      type: 'string',
      options: {
        list: Dropdowns.BlogSources,
      },
    }),
    defineField({
      name: NamingConstants.ARTICLE,
      title: 'Article Info',
      description: 'The core article information for this blog post',
      type: 'articleInfo',
      fieldset: 'article',
      validation: (rule) =>
        rule.required().error('All Blog Posts must include article information'),
    }),
    defineField({
      ...CommonWidgets.MetaRobots,
    }),
  ],
  preview: {
    select: {
      title: CompoundNames.ARTICLE_TITLE,
      publishDate: CompoundNames.ARTICLE_DATE,
    },
    prepare({title, publishDate}) {
      return {
        title,
        subtitle: new Date(publishDate).toLocaleDateString(),
      }
    },
  },
})
