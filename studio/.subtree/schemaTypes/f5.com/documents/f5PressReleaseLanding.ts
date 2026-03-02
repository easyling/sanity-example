import {DocumentsIcon, HomeIcon, PanelRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5PressReleaseLanding = withDataLayer(
  withSeo(
    defineType({
      name: 'f5PressReleaseLanding',
      title: 'Press Release Landing Page',
      type: 'document',
      icon: HomeIcon,
      groups: [
        {name: 'metadata', title: 'Metadata', icon: DocumentsIcon},
        {name: 'sidebar', title: 'SideBar', icon: PanelRightIcon},
      ],
      fields: [
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
        defineField({
          name: 'pressContacts',
          description: 'Press Contacts',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: {type: 'individual'},
              options: {filter: '_type == "individual" && "pressContact" in roles'},
            },
          ],
          validation: (rule) => rule.max(3),
          group: 'sidebar',
        }),
        defineField({
          name: 'resources',
          title: 'Press Resources',
          type: 'f5NextSteps',
          group: 'sidebar',
        }),
      ],
      preview: {
        select: {
          title: 'heroData.title',
        },
        prepare({title}) {
          return {
            title: title || 'F5.com Press Release Landing Page',
            subtitle: 'Configure Press Release Landing Page metadata and hero content for F5.com',
          }
        },
      },
    }),
  ),
)
