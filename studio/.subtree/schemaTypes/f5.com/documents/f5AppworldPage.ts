import {DocumentIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5AppworldPage = withDataLayer(
  withSeo(
    defineType({
      name: 'f5AppworldPage',
      title: 'Appworld Page',
      type: 'document',
      icon: DocumentIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          validation: (rule) => rule.required().error('All pages must have a title'),
        }),
        defineField({
          ...CommonWidgets.Slug,
          validation: (rule) => rule.required().error('All pages must have a slug'),
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Page Content',
          type: 'f5GenericContentPageBuilder',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          name: 'pageLocation',
          title: 'Page Location',
          description:
            'Choose the location within the site that best fits your content. This will determine the URL of the page.',
          type: 'string',
          options: {
            list: Dropdowns.AppworldPageLocations,
          },
          group: 'metadata',
          validation: (rule) => rule.required().error('All pages must have a page location'),
        }),
        defineField({
          ...CommonWidgets.ImageData,
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
            title: title,
            media: media,
          }
        },
      },
    }),
  ),
)
