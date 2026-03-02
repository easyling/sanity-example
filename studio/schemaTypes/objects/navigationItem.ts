import {ChevronRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {CommonWidgets} from '../../dialogs/commonWidgets'
import {Dropdowns} from '../../dialogs/dropdowns'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Text that represents this navigation item',
      type: 'string',
      validation: (rule) => rule.required().error('All navigation items need a label'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Icon that represents this navigation item',
      type: 'string',
      options: {
        list: Dropdowns.AvailableIcons,
      },
    }),
    defineField({
      name: 'linkType',
      title: 'Type',
      type: 'string',
      options: {
        list: Dropdowns.LinkTypes,
      },
      validation: (rule) =>
        rule.required().error('Please choose a link type for this navigation item'),
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link Reference',
      description:
        'Reference to a Sanity document that will generate a URL that the navigation item points to',
      type: 'reference',
      to: [{type: 'labsLandingPage'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: NamingConstants.LINK_URL,
      title: 'External Link URL',
      type: 'url',
      description: 'URL that the navigation item points to',
      validation: (rule) => rule.uri({}),
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'subnavigationItems',
      title: 'Subnavigation Items',
      description: 'List of subnavigation items that appear underneath this navigation item',
      type: 'array',
      of: [
        {
          type: 'subnavigationSection',
        },
      ],
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({label}) {
      return {
        title: label,
        media: ChevronRightIcon,
      }
    },
  },
})

export const subnavigationSection = defineType({
  name: 'subnavigationSection',
  title: 'Subnavigation Section',
  type: 'object',
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'Navigation title',
    }),
    defineField({
      name: 'navigationItems',
      title: 'Subnavigation items',
      type: 'array',
      of: [{type: 'navigationItem'}],
    }),
  ],
})
