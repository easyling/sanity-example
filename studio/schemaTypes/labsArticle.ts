import {DocumentTextIcon, InfoFilledIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CompoundNames, NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'
import {Dropdowns} from '../dialogs/dropdowns'

export const labsArticle = defineType({
  name: 'labsArticle',
  title: 'F5 Labs Article',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'articleInfo',
      title: 'Article Contents',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'downloadableAssets',
      title: 'Downloadable Assets',
      options: {columns: 2},
    },
    {
      name: 'sidebarContent',
      title: 'Sidebar Content',
      options: {collapsible: true, collapsed: false},
    },
  ],
  groups: [
    {name: 'articleInfo', title: 'Article Contents', icon: DocumentTextIcon},
    {name: 'metadata', title: 'Metadata', icon: InfoFilledIcon},
  ],
  fields: [
    defineField({
      name: NamingConstants.ARTICLE,
      title: 'Article Info',
      group: 'articleInfo',
      fieldset: 'articleInfo',
      description: 'The core article information for this report',
      type: 'articleInfo',
      validation: (rule) =>
        rule.required().error('All F5 Labs Articles must include article information'),
    }),
    defineField({
      ...CommonWidgets.Slug,
      group: 'metadata',
      options: {
        source: CompoundNames.ARTICLE_TITLE,
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('All F5 Labs Articles must have a slug'),
    }),
    defineField({
      name: 'termsToKnow',
      title: 'Terms to Know',
      description: 'A list of glossary terms that are relevant to the current article',
      type: 'array',
      group: 'articleInfo',
      fieldset: 'sidebarContent',
      of: [
        {
          type: 'reference',
          to: [{type: 'glossaryTerm'}],
        },
      ],
    }),
    defineField({
      name: 'vitals',
      title: 'Vitals section',
      description: 'A list of headers and associated tags to display in the sidebar',
      group: 'articleInfo',
      fieldset: 'sidebarContent',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'items',
              title: 'Vitals items',
              description: 'The title of the selected tags will be displayed under the heading',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: {type: 'category'},
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      description: 'A list of reasons a person might want to read this article',
      group: 'articleInfo',
      fieldset: 'sidebarContent',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: NamingConstants.PRIMARY_CATEGORY,
      title: 'Primary Topic',
      description: 'The primary topic of this article',
      group: 'metadata',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required().error('All F5 Labs Articles must have a primary topic'),
    }),
    defineField({
      name: 'series',
      title: 'Article Series',
      description: 'The series this article belongs to',
      group: 'metadata',
      type: 'reference',
      to: [{type: 'series'}],
    }),
    defineField({
      name: 'dataNuggets',
      title: 'Data Nuggets',
      description:
        'Data Nuggets associated with this article. Often displayed in locations referencing this article.',
      group: 'articleInfo',
      type: 'array',
      of: [{type: 'dataNugget'}],
    }),
    /* To have arrays in arrays, they must be wrapped in objects like this. Can't abstract out into a separate file */
    defineField({
      name: 'articleActions',
      title: 'Article Actions',
      description:
        'Set of Icons and Text detailing actions to take in response to the article content',
      type: 'array',
      group: 'articleInfo',
      of: [
        {
          type: 'object',
          title: 'articleAction',
          fields: [
            {
              title: 'Icons',
              name: 'icons',
              description: 'Icons this action falls under',
              type: 'array',
              of: [{type: 'string', options: {list: Dropdowns.ArticleActionIcons}}],
              validation: (rule) => [
                rule.max(2).error('You must choose exactly two icons'),
                rule.min(2).error('You must choose exactly two icons'),
              ],
            },
            {
              title: 'Actions',
              name: 'actions',
              description:
                'A list of action items users can take to mitigate the threats described in the article',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) =>
                rule.min(1).error('Each Article Action must contain at least one text bullet'),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'appendices',
      title: 'Appendices',
      type: 'array',
      group: 'articleInfo',
      of: [{type: 'accordionInfo'}],
    }),
    defineField({
      name: 'articleType',
      title: 'Article Type',
      type: 'string',
      group: 'metadata',
      options: {
        list: Dropdowns.LabsArticleTypes,
      },
      validation: (rule) => rule.required().error('All F5 Labs Articles must have an Article Type'),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      description: 'Major content type of this article',
      group: 'metadata',
      type: 'string',
      options: {
        list: Dropdowns.LabsContentTypes,
      },
      validation: (rule) => rule.required().error('All F5 Labs Articles must have a Content Type'),
    }),
    defineField({
      name: 'hasTableOfFigures',
      title: 'Create table of figures',
      description: 'Creates a table of figures at the top of the article',
      group: 'articleInfo',
      type: 'boolean',
    }),
    defineField({
      name: 'downloadableAssets',
      title: 'PDF file',
      description: 'Any downloadable assets associated with this report',
      group: 'articleInfo',
      fieldset: 'downloadableAssets',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'application/pdf',
          },
        },
      ],
    }),
    defineField({
      name: 'downloadableAssetsBackgroundImage',
      title: 'Image',
      description: 'The representative image for the Downloadable Asset',
      group: 'articleInfo',
      type: 'image',
      fieldset: 'downloadableAssets',
    }),
    defineField({
      name: 'downloadableAssetsText',
      title: 'Button Text',
      group: 'articleInfo',
      type: 'string',
      fieldset: 'downloadableAssets',
    }),
    defineField({
      ...CommonWidgets.SocialMediaImage,
      group: 'articleInfo',
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
