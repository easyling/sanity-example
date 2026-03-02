import {defineArrayMember, defineField, defineType} from 'sanity'

import {CommonWidgets} from '../../dialogs/commonWidgets'
import {Dropdowns} from '../../dialogs/dropdowns'

export const footerCredibility = defineType({
  name: 'footerCredibility',
  title: 'Credibility Section',
  type: 'object',
  fields: [
    defineField({
      name: 'textLogos',
      title: 'Logos and Text',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'type',
          type: 'object',
          title: 'Type',
          validation: (rule) => [
            rule.custom((fields) => {
              return fields?.credibilityType == 'text' && !fields?.text ? 'Text is required' : true
            }),
            rule.custom((fields) => {
              return fields?.credibilityType == 'logo' && !fields?.logo ? 'Logo is required' : true
            }),
          ],
          fields: [
            {
              name: 'credibilityType',
              type: 'string',
              options: {
                list: Dropdowns.FooterCredibilityTypes,
              },
            },
            {
              ...CommonWidgets.Description,
              hidden: ({parent}) => parent?.credibilityType !== 'logo',
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              hidden: ({parent}) => parent?.credibilityType !== 'logo',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              hidden: ({parent}) => parent?.credibilityType !== 'text',
            },
          ],
          preview: {
            select: {
              description: 'description',
              text: 'text',
              logo: 'logo.asset',
            },
            prepare({description, text, logo}) {
              const title = description ?? text
              return {
                title,
                media: logo,
              }
            },
          },
        }),
      ],
    }),
  ],
})
