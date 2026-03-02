import {BookIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5GlossaryTerm = withDataLayer(
  withSeo(
    defineType({
      name: 'f5GlossaryTerm',
      title: 'Glossary Term',
      type: 'document',
      icon: BookIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          description: 'The term itself',
          validation: (rule) => rule.required().error('All Glossary Terms must have a title'),
        }),
        defineField({
          ...CommonWidgets.Description,
          title: 'Definition',
          description: 'The definition of the term',
          type: 'f5BaseBlockContent',
          validation: (rule) => rule.required().error('All Glossary Terms must have a definition'),
        }),
        defineField({
          ...CommonWidgets.Slug,
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Page Content',
          type: 'f5GlossaryTermBlockContent',
        }),
        defineField({
          name: 'relatedContentTag',
          title: 'Related Content Tag',
          description:
            'Choose ONE tag, which will generate the Related Content section. The most recent Blog article, Case Study, and next upcoming Event with this tag will be displayed.',
          type: 'reference',
          to: [{type: 'category'}],
          group: 'metadata',
          validation: (rule) =>
            rule.required().error('All Glossary Terms must have a related content category'),
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
          initialValue: {
            breadcrumb: 'true',
          },
        }),
        defineField({
          name: 'disableBreadcrumb',
          title: 'Disable Breadcrumb Editing',
          description:
            'When enabled, the breadcrumb dropdown in the Hero is read-only for this term.',
          type: 'boolean',
          initialValue: false,
          hidden: false,
        }),
      ],
      preview: {
        select: {
          title: NamingConstants.TITLE,
        },
        prepare({title}) {
          return {
            title: title,
          }
        },
      },
    }),
  ),
)
