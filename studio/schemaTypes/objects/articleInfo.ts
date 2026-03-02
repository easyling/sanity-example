import {BlockContentIcon, ImageIcon, InfoFilledIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {CommonWidgets} from '../../dialogs/commonWidgets'

export const articleInfo = defineType({
  name: 'articleInfo',
  title: 'Article Info',
  type: 'object',
  fieldsets: [{name: 'dates', title: 'Dates', options: {columns: 2}}],
  groups: [
    {name: 'metadata', title: 'Metadata', icon: InfoFilledIcon},
    {name: 'content', title: 'Content', icon: BlockContentIcon},
    {name: 'images', title: 'Images', icon: ImageIcon},
  ],
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'The title of the article, usually the headline',
      group: 'metadata',
      validation: (rule) => rule.required().error('All articles must include a title'),
    }),
    defineField({
      ...CommonWidgets.Description,
      description: 'A brief summary of the article',
      group: 'metadata',
      validation: (rule) => rule.required().error('All articles must include a description'),
    }),
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Article Content',
      description: 'Article content',
      type: 'articleBlockContent',
      group: 'content',
      validation: (rule) => rule.required().error('All articles must include content'),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'individual'},
          options: {filter: '_type == "individual" && "author" in roles'},
        },
      ],
      group: 'metadata',
      validation: (rule) => rule.required().error('All articles must include at least one author'),
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'individual'},
          options: {filter: '_type == "individual" && "author" in roles'},
        },
      ],
      group: 'metadata',
      description: 'Individuals who contributed to, but did not author, the article',
    }),
    defineField({
      name: 'footnotes',
      title: 'Footnotes',
      type: 'array',
      group: 'metadata',
      of: [{type: 'footnoteInfo'}],
    }),
    defineField({
      name: NamingConstants.PUBLISH_DATE,
      title: 'Publish date',
      type: 'datetime',
      fieldset: 'dates',
      group: 'metadata',
      validation: (rule) => rule.required().error('All articles must include a publish date'),
    }),
    defineField({
      name: 'lastModification',
      title: 'Last significant modification',
      description:
        'The last time this article was significantly updated (more than just a typo fix)',
      type: 'datetime',
      fieldset: 'dates',
      group: 'metadata',
    }),
    defineField({...CommonWidgets.Categories, group: 'metadata'}),
    defineField({
      ...CommonWidgets.Image,
      title: 'Thumbnail Image',
      group: 'images',
      description:
        'This image appears in search results. If no large Thumbnail is selected, then it also appears in other instances of tiles.',
      validation: (rule) => rule.required().error('All articles must include a Thumbnail Image'),
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'images',
    }),
    defineField({
      name: 'largeThumbnail',
      title: 'Large Thumbnail',
      description:
        'This image appears in instances of Tiles, such as Read More, Featured Articles, and Landing page displays.',
      type: 'image',
      group: 'images',
    }),
    defineField({
      name: 'timeToRead',
      title: 'Time to Read',
      type: 'number',
      group: 'metadata',
      description:
        'The estimated time to read the article in minutes' /* TODO: make a custom field that generates ttr based on content block */,
    }),
    defineField({
      ...CommonWidgets.MetaRobots,
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      date: NamingConstants.PUBLISH_DATE,
      media: NamingConstants.IMAGE,
    },
    prepare({title, date, media}) {
      return {
        title,
        subtitle: new Date(date).toLocaleDateString(),
        media,
      }
    },
  },
})
