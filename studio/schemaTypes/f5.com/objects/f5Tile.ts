import {InlineElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {Lists} from '../../../dialogs/lists'

export const f5Tile = defineType({
  name: 'f5Tile',
  title: 'Tile',
  type: 'document',
  icon: InlineElementIcon,
  fieldsets: [
    {name: 'link', title: 'Link', options: {collapsible: true, collapsed: false}},
    {name: 'content', title: 'Content', options: {collapsible: true, collapsed: false}},
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
      name: NamingConstants.INTERNAL_LINK_URL,
      title: 'Document to link to',
      description: 'Pick a Sanity document that this will link to',
      type: 'reference',
      to: Lists.f5ComPageDocuments,
      hidden: ({parent}) => parent?.action !== 'internal',
      fieldset: 'link',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'f5Icon',
      fieldset: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      description:
        'Works best with F5 Basic and F5 Brand icon sets. Not recommended for Filled or Product icons.',
      type: 'string',
      initialValue: 'brand',
      options: {list: Dropdowns.F5IconColors},
      fieldset: 'content',
      hidden: ({parent, document}) => ['f5Filled', 'f5Product'].includes(parent?.icon?.provider),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Eyebrow is only used in Complex Cards',
      type: 'string',
      fieldset: 'content',
    }),
    defineField({
      name: NamingConstants.PRIMARY_TEXT,
      title: 'Link Label',
      type: 'string',
      fieldset: 'content',
      validation: (rule) => rule.required().error('Each card much contain a heading'),
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.PRIMARY_TEXT,
      subtitle: NamingConstants.SECONDARY_TEXT,
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle,
      }
    },
  },
})
