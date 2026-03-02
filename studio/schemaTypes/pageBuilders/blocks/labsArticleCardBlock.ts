import {SquareIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CompoundNames} from '../../../constants/namingConstants'

export const labsArticleCardBlock = defineType({
  name: 'labsArticleCardBlock',
  title: 'Article Card',
  type: 'object',
  fields: [
    defineField({
      name: 'article',
      title: 'Article',
      description: 'Article from which information will be taken (title, image, etc.)',
      type: 'reference',
      to: {
        type: 'labsArticle',
      },
    }),
    defineField({
      name: 'overrideArticleAbstractImage',
      title: 'Override Article Abstract/Image',
      type: 'boolean',
    }),
    defineField({
      name: 'articleAbstractOverrideText',
      title: 'Article Abstract Override Text',
      type: 'articleBlockContent',
      hidden: ({parent}) => !parent?.overrideArticleAbstractImage,
    }),
    defineField({
      name: 'articleThumbnailOverride',
      title: 'Article Thumbnail Override',
      type: 'image',
      hidden: ({parent}) => !parent?.overrideArticleAbstractImage,
    }),
  ],
  preview: {
    select: {
      title: `article.${CompoundNames.ARTICLE_TITLE}`,
    },
    prepare({title}) {
      return {
        title: `Article card: ${title}`,
        media: SquareIcon,
      }
    },
  },
})
