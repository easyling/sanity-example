import {BookIcon, DocumentsIcon, PanelRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5PressRelease = withDataLayer(
  withSeo(
    defineType({
      name: 'f5PressRelease',
      title: 'Press Releases',
      type: 'document',
      icon: BookIcon,
      groups: [
        {name: 'metadata', title: 'Metadata', icon: DocumentsIcon},
        {name: 'sidebar', title: 'SideBar', icon: PanelRightIcon},
      ],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          description: 'The Press Release title',

          validation: (rule) => rule.required().error('All Press Releases must have a title'),
        }),
        defineField({
          ...CommonWidgets.Description,
          title: 'Description',
          description: 'The description of the press release',
          type: 'text',

          validation: (rule) => rule.required().error('All press releases must have a description'),
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
        defineField({
          name: 'publishDate',
          description: 'Publish Date',
          type: 'date',
          options: {
            dateFormat: 'MMMM DD, YYYY',
            // Customize the display format
          },
          group: 'sidebar',
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
          validation: (rule) =>
            rule.required().error('All press releases must include at least one author'),
          group: 'sidebar',
        }),
      ],
      orderings: [
        {
          title: 'Publish Date (Latest First)',
          name: 'releaseDateDesc',
          by: [{field: 'publishDate', direction: 'desc'}],
        },
        {
          title: 'Publish Date (Oldest First)',
          name: 'releaseDateAsc',
          by: [{field: 'publishDate', direction: 'asc'}],
        },
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
