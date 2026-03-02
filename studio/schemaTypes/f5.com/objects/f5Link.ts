import {defineField, defineType} from 'sanity'
import {Lists} from '../../../dialogs/lists'
import {NamingConstants} from '../../../constants/namingConstants'

export const f5Link = defineType({
  name: 'f5Link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      description: 'Text that represents this link',
      type: 'string',
      validation: (rule) => rule.required().error('All links need a label'),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Reference (Recommended)', value: 'reference'},
          {title: 'URL', value: 'url'},
        ],
      },
      validation: (rule) =>
        rule.required().error('Please choose a link type for this navigation item'),
    }),
    defineField({
      name: 'reference',
      title: 'Link Reference',
      description:
        'Reference to a Sanity document that will generate a URL that the navigation item points to',
      type: 'reference',
      to: [{type: 'f5BlogLanding'}, ...Lists.f5ComPageDocuments],
      hidden: ({parent}) => parent?.linkType !== 'reference',
    }),
    defineField({
      name: NamingConstants.LINK_URL,
      title: 'Link URL',
      type: 'url',
      description: 'URL that the navigation item points to. Relative URLs are supported.',
      validation: (rule) => rule.uri({allowRelative: true}),
      hidden: ({parent}) => parent?.linkType !== 'url',
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
