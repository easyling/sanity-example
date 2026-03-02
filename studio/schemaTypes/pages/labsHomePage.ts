import {
  BlockElementIcon,
  ConfettiIcon,
  HashIcon,
  HomeIcon,
  MasterDetailIcon,
  StarFilledIcon,
  TextIcon,
  ThLargeIcon,
} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {Dropdowns} from '../../dialogs/dropdowns'

/**
 * Schema definition for the F5 Labs Home Page
 */

export const labsHomePage = defineType({
  name: 'labsHomePage',
  title: 'F5 Labs Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'pageHeading', title: 'Page Heading', icon: MasterDetailIcon},
    {name: 'featuredArticles', title: 'Featured Articles', icon: StarFilledIcon},
    {name: 'allArticleCards', title: 'All Article Cards Section', icon: ThLargeIcon},
    {name: 'teaser', title: 'Teaser', icon: ConfettiIcon},
    {name: 'largeCards', title: 'Large Cards Section', icon: BlockElementIcon},
    {name: 'statsSection', title: 'Statistics Section', icon: HashIcon},
    {name: 'textSection', title: 'Text Section', icon: TextIcon},
  ],
  fields: [
    defineField({
      name: 'pageHeadingText',
      title: 'Page Heading Text',
      description: 'Primary heading for the Labs Home Page',
      type: 'string',
      group: 'pageHeading',
    }),
    defineField({
      name: 'pageHeadingBackgroundImage',
      title: 'Page Heading Background Image',
      description: 'Image to be placed behind the page heading text',
      type: 'image',
      group: 'pageHeading',
    }),
    // DEPRECATED
    defineField({
      name: 'featuredArticleSeries',
      title: 'Featured Article Series -- DEPRECATED',
      description: 'Series of articles to be featured on the Labs Home Page',
      type: 'reference',
      to: [{type: 'series'}],
      group: 'featuredArticles',
    }),
    // NEW FEATURED ARTICLES
    defineField({
      name: 'featuredArticleSlots',
      title: 'Featured Article Slots',
      description: 'Ordered list of featured articles shown on the homepage',
      type: 'array',
      of: [{type: 'featuredArticleSlot'}],
      group: 'featuredArticles',
      options: {
        sortable: true,
      },
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'allArticleCardsHeadingText',
      title: 'All Article Cards Heading Text',
      description: 'Heading for the All Article Cards section',
      type: 'string',
      group: 'allArticleCards',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      description: 'Teaser to be displayed on the Labs Home Page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'teaser'},
        },
      ],
      group: 'teaser',
      validation: (rule) => rule.max(1).error('Only one teaser is currently supported'),
    }),
    defineField({
      name: 'largeCardsHeadingText',
      title: 'Large Cards Heading Text',
      description: 'Heading for the Large Cards section',
      type: 'string',
      group: 'largeCards',
    }),
    defineField({
      name: 'largeCardsSecondaryText',
      title: 'Large Cards Secondary Text',
      description: 'Secondary Text for the Large Cards section',
      type: 'text',
      group: 'largeCards',
    }),
    defineField({
      name: 'largeCardsSelectionMethod',
      title: 'Large Cards Selection Method',
      description: 'Method for selecting large cards to be displayed on the Labs Home Page',
      type: 'string',
      options: {
        list: Dropdowns.LabsLargeCardsSelectionMethods,
      },
      group: 'largeCards',
    }),
    defineField({
      name: 'statsSectionHeadingText',
      title: 'Statistics Section Heading Text',
      description: 'Heading for the Statistics Section',
      type: 'string',
      group: 'statsSection',
    }),
    defineField({
      name: 'statsSectionSecondaryText',
      title: 'Statistics Section Secondary Text',
      description: 'Secondary Text for the Statistics section',
      type: 'text',
      group: 'statsSection',
    }),
    defineField({
      name: 'statsSectionSubheadingText',
      title: 'Statistics Section Subheading Text',
      description: 'Subheading for the Statistics Section',
      type: 'string',
      group: 'statsSection',
    }),
    defineField({
      name: 'statsSectionArticles',
      title: 'Statistics Section Articles',
      description: 'Articles whose Data Nuggets should be displayed in the Statistics Section',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'labsArticle'},
        },
      ],
      group: 'statsSection',
      validation: (rule) => rule.max(1).error('Only one article is currently supported'),
    }),
    defineField({
      name: 'statsImage',
      title: 'Background Image',
      type: 'image',
      group: 'statsSection',
    }),
    defineField({
      name: 'textSectionPrimaryText',
      title: 'Text Section Primary Text',
      description: 'Primary text for the text section',
      type: 'labsBlockContent',
      group: 'textSection',
    }),
    defineField({
      name: 'textSectionSecondaryText',
      title: 'Text Section Secondary Text',
      description: 'Secondary text for the text section',
      type: 'labsBlockContent',
      group: 'textSection',
    }),
  ],
  preview: {
    select: {
      title: 'pageHeadingText',
    },
    prepare({title}) {
      title = 'F5 Labs Home Page'
      return {
        title,
      }
    },
  },
})
