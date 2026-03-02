import {BlockContentIcon} from '@sanity/icons'
import type {TypedObject} from 'sanity'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'

export const labsTextAndArticleCardsBlock = defineType({
  name: 'labsTextAndArticleCardsBlock',
  title: 'Text + Article Cards',
  type: 'object',
  fields: [
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text Content',
      type: 'labsBlockContent',
      validation: (rule) =>
        rule.required().error('Text + Article Cards blocks must contain text content.'),
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      description: 'One or more articles whose data will be used in the block',
      type: 'array',
      of: [{type: 'reference', to: {type: 'labsArticle'}}],
      validation: (rule) =>
        rule
          .min(1)
          .error('Each Text + Article Cards must contain at least one article to draw data from'),
    }),
    defineField({
      name: 'designHint',
      title: 'Front-end hint',
      description:
        'If possible, the front-end will render your content using your design hint as context. Leave blank for default behavior',
      type: 'string',
      options: {
        list: [
          {title: 'Card left', value: 'card-left'},
          {title: 'Card right', value: 'card-right'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      blocks: 'content',
      article_1: 'articles.0.articleInfo.title',
      article_2: 'articles.1.articleInfo.title',
    },
    prepare(value) {
      const block = (value.blocks || []).find((block: TypedObject) => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter((child: TypedObject) => child._type === 'span')
              .map((span: TypedObject) => span.text)
              .join('')
          : 'No text',
        subtitle: `Cards: ${value.article_1}${value.article_2 ? ', ' + value.article_2 : ''}`,
        media: BlockContentIcon,
      }
    },
  },
})
