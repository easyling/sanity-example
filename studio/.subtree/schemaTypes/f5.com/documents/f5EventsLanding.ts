import {CalendarIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5EventsLanding = withDataLayer(
  withSeo(
    defineType({
      name: 'f5EventsLanding',
      title: 'Events Landing',
      type: 'document',
      icon: CalendarIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          validation: (rule) => rule.required().error('Events Landing page must have a title'),
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Page Content',
          description:
            'Add content blocks including text, HTML blocks for events tables, and card blocks for webinars',
          type: 'f5EventsLandingPageBuilder',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
      ],
      preview: {
        select: {
          title: NamingConstants.TITLE,
          media: 'main',
        },
        prepare({title, media}) {
          return {
            title: title || 'Events Landing Page',
            media: media,
          }
        },
      },
    }),
  ),
)
