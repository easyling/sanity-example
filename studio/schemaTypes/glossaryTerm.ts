import {BookIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'basic', title: 'Basic', icon: BookIcon},
    {name: 'metadata', title: 'Metadata', icon: DocumentsIcon},
  ],
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'The term itself',
      group: 'basic',
      validation: (rule) => rule.required().error('All Glossary Terms must have a title'),
    }),
    defineField({
      ...CommonWidgets.Description,
      title: 'Definition',
      description: 'The definition of the term',
      group: 'basic',
      validation: (rule) => rule.required().error('All Glossary Terms must have a definition'),
    }),
    defineField({
      name: 'relatedContentTag',
      title: 'Related Content Category',
      description: 'Choose the category that determines the content related to this term',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'metadata',
    }),
    defineField({
      ...CommonWidgets.SeoData,
      group: 'metadata',
    }),
    defineField({
      ...CommonWidgets.ImageData,
      group: 'metadata',
    }),
    defineField({
      name: 'heroData',
      title: 'Hero Display Content',
      type: 'heroData',
      group: 'basic',
    }),
    defineField({
      name: 'disableBreadcrumb',
      type: 'boolean',
      initialValue: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      subtitle: NamingConstants.DESCRIPTION,
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
