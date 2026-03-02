import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {CommonWidgets} from '../../../../dialogs/commonWidgets'
import {Lists} from '../../../../dialogs/lists'

export const f5Figure = defineType({
  name: 'f5Figure',
  title: 'Figure',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [
    {name: 'link', title: 'Link Information', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: NamingConstants.IMAGE,
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required().error('You must define an image to display'),
    }),
    defineField({
      name: 'width',
      title: 'Max Width',
      type: 'number',
      description: 'Leave empty if you do not need to set a max width',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility',
    }),
    defineField({
      ...CommonWidgets.Title,
      description:
        'Often presented as a tooltip to the end user. Do not use the same text as Alt Text.',
    }),
    defineField({
      name: 'openInModal',
      title: 'Open in Modal',
      description:
        'Turn on to have the image open in a modal on click. Note that this overrides any link behavior.',
      type: 'boolean',
    }),
    defineField({
      ...CommonWidgets.LinkAction,
      fieldset: 'link',
    }),
    defineField({
      ...CommonWidgets.ExternalLinkUrl,
      fieldset: 'link',
    }),
    defineField({
      ...CommonWidgets.FileLink,
      fieldset: 'link',
    }),
    defineField({
      name: NamingConstants.INTERNAL_LINK_URL,
      title: 'Document to link to',
      description: 'Pick a Sanity document that this will link to',
      type: 'reference',
      to: Lists.f5ComPageDocuments,
      hidden: ({parent}) => parent?.action !== 'internal',
      fieldset: 'link',
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      caption: 'caption',
      alt: 'altText',
    },
    prepare: ({title, caption, alt}) => {
      const titleValue = title ?? caption ?? alt ?? 'No title'
      return {
        title: titleValue,
      }
    },
  },
})
