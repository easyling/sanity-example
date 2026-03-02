import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CompoundNames, NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'

export const pressRelease = defineType({
  name: 'pressRelease',
  title: 'Press Release',
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
      name: NamingConstants.ARTICLE,
      title: 'Article Info',
      description: 'The core article information for this press release',
      type: 'articleInfo',
      fieldset: 'article',
      validation: (rule) =>
        rule.required().error('All Press Releases must include article information'),
    }),
    defineField({
      name: 'pressContacts',
      title: 'Press Contacts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'individual'},
          options: {filter: '_type == "individual" && "pressContact" in roles'},
        },
      ],
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
