import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {Dropdowns} from '../dialogs/dropdowns'
import {NamingConstants} from '../constants/namingConstants'

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'document',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Call to Action text',
      type: 'string',
      validation: (rule) => rule.required().error('All Call to Actions must have a label'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Optional icon to display next to the label',
      type: 'string',
      options: {
        list: Dropdowns.CtaIcons,
      },
    }),
    defineField({
      name: 'action',
      title: 'CTA Action',
      description: 'What you want the CTA to do when interacted with',
      type: 'string',
      options: {
        list: Dropdowns.CtaActions,
      },
    }),
    defineField({
      name: NamingConstants.INTERNAL_LINK_URL,
      title: 'Document to link to',
      description: 'Pick a Sanity document that this CTA will link to',
      type: 'reference',
      // TODO: Figure out why this doesn't work with f5 page types
      to: [{type: 'category'}],
      hidden: ({parent}) => parent?.action !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'URL of the asset outside of Sanity that you want to link to/utilize',
      type: 'url',
      validation: (rule) => rule.uri({}),
      hidden: ({parent}) => parent?.action !== 'external' && parent?.action !== 'video',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      hidden: ({parent}) => parent?.action !== 'file',
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({label}) {
      return {
        title: label ?? 'No Label',
      }
    },
  },
})
