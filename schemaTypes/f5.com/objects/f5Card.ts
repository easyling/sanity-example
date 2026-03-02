import { InlineElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { NamingConstants } from '../../../constants/namingConstants'
import { CommonWidgets } from '../../../dialogs/commonWidgets'
import { Dropdowns } from '../../../dialogs/dropdowns'
import { Lists } from '../../../dialogs/lists'

export const f5Card = defineType({
  name: 'f5Card',
  title: 'Card',
  type: 'object',
  icon: InlineElementIcon,
  fieldsets: [
    { name: 'link', title: 'Card Link', options: { collapsible: true, collapsed: false } },
    { name: 'content', title: 'Card Content', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
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
      hidden: ({ parent }) => parent?.action !== 'internal',
      fieldset: 'link',
    }),
    defineField({
      name: 'mediaType',
      title: 'Card Media Type',
      type: 'string',
      initialValue: 'icon',
      options: {
        list: [
          { title: 'Icon', value: 'icon' },
          { title: 'Image', value: 'image' },
          { title: 'None', value: 'NONE' },
        ],
      },
      fieldset: 'content',
      hidden: ({ document }) => document?._type === 'f5NextStepsCard',
    }),
    defineField({
      name: 'imageStyle',
      title: 'Image Style',
      type: 'string',
      options: {
        list: [
          { title: 'Circle', value: 'circle' },
          { title: 'Full Bleed', value: 'full' },
        ],
      },
      initialValue: 'circle',
      fieldset: 'content',
      hidden: ({ parent, document }) =>
        parent?.mediaType !== 'image' || document?._type === 'f5NextStepsCard',
    }),
    defineField({
      name: NamingConstants.IMAGE,
      title: 'Image',
      type: 'image',
      fieldset: 'content',
      hidden: ({ parent, document }) =>
        parent?.mediaType !== 'image' || document?._type === 'f5NextStepsCard',
      validation: (rule) =>
        rule
          .custom((value, context) => {
            // @ts-ignore
            if (context.parent?.mediaType === 'image') {
              return typeof value !== 'undefined'
                ? true
                : 'Image is required when media type is Image'
            }
            return true
          })
          .error(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'f5Icon',
      fieldset: 'content',
      hidden: ({ parent }) => parent?.mediaType !== 'icon',
      validation: (rule) =>
        rule
          .custom((value, context) => {
            // @ts-ignore
            if (context.parent?.mediaType === 'icon') {
              return typeof value !== 'undefined' ? true : 'Icon is required'
            }
            return true
          })
          .error(),
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      description:
        'Works best with F5 Basic and F5 Brand icon sets. Not recommended for Filled or Product icons.',
      type: 'string',
      initialValue: 'brand',
      options: { list: Dropdowns.F5IconColors },
      fieldset: 'content',
      hidden: ({ parent, document }) =>
        parent?.mediaType !== 'icon' ||
        document?._type === 'f5NextStepsCard' ||
        ['f5Filled', 'f5Product'].includes(parent?.icon?.provider),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Eyebrow is only used in Complex Cards',
      type: 'string',
      fieldset: 'content',
      hidden: ({ document }) => document?._type === 'f5NextStepsCard',
    }),
    defineField({
      name: NamingConstants.PRIMARY_TEXT,
      title: 'Heading',
      type: 'string',
      fieldset: 'content',
      validation: (rule) => rule.required().error('Each card much contain a heading'),
    }),
    defineField({
      name: NamingConstants.SECONDARY_TEXT,
      title: 'Supporting Text',
      type: 'text',
      fieldset: 'content',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      description: 'If entered, will include a button in the card',
      type: 'string',
    }),
    defineField({
      name: 'buttonVariation',
      title: 'Button Theme',
      type: 'string',
      options: {
        list: Dropdowns.AvailableThemes,
      },
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.PRIMARY_TEXT,
      subtitle: NamingConstants.SECONDARY_TEXT,
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      }
    },
  },
})
