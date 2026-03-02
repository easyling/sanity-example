import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {trimBlockContentForPreview} from '../../../../utils/blockContent'

export const f5LeftRight = defineType({
  name: 'f5LeftRight',
  title: 'Text + Media',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [
    {name: 'link', title: 'Link Information', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Type of Media',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          {title: 'Text on the Left', value: 'text-left'},
          {title: 'Text on the Right', value: 'text-right'},
        ],
      },
    }),
    defineField({
      name: 'useAlternateBackgroundColor',
      title: 'Use alternate background color',
      type: 'boolean',
    }),
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text',
      type: 'f5BaseBlockContent',
      validation: (rule) => rule.required().error('You must add text content to the Text + Media'),
    }),
    defineField({
      name: NamingConstants.IMAGE,
      title: 'Image',
      type: 'f5Figure',
      hidden: ({parent}) => parent?.mediaType === 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value && context.document?.mediaType === 'image') {
            return 'You must add an image to the Left / Right'
          }
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'f5EmbeddedVideo',
      hidden: ({parent}) => parent?.mediaType === 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value && context.document?.mediaType === 'video') {
            return 'You must add a video to the Left / Right'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      caption: 'caption',
      alt: 'altText',
      content: NamingConstants.BLOCK_CONTENT,
    },
    prepare: ({title, caption, alt, content}) => {
      const titleValue = title ?? caption ?? alt ?? 'No image title'
      if (content && Array.isArray(content)) {
        return {
          title: trimBlockContentForPreview(content),
          subtitle: titleValue,
        }
      }
      return {
        title: 'Rich text',
        subtitle: titleValue,
      }
    },
  },
})
