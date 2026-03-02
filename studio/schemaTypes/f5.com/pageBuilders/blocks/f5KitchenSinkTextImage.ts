import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {CommonWidgets} from '../../../../dialogs/commonWidgets'
import {Lists} from '../../../../dialogs/lists'
import {trimBlockContentForPreview} from '../../../../utils/blockContent'

export const f5KitchenSinkTextImage = defineType({
  name: 'f5KitchenSinkTextImage',
  title: 'Text (all) + Image',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [
    {name: 'link', title: 'Link Information', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      title: 'Text',
      type: 'f5KitchenSinkBlockContent',
      validation: (rule) => rule.required().error('You must add text content to the Text + Image'),
    }),
    defineField({
      name: NamingConstants.IMAGE,
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required().error('You must add an image to the Text + Image'),
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
