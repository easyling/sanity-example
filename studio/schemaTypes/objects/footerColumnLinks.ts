import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {Dropdowns} from '../../dialogs/dropdowns'

// TODO: find a way to reuse only some attributes from navigationItem object
export const footerColumnLinks = defineType({
  name: 'footerColumnLinks',
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
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({label}) {
      return {
        title: label,
      }
    },
  },
})
