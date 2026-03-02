import {defineField, defineType} from 'sanity'

import {Dropdowns} from '../../../dialogs/dropdowns'

export const f5LogoBlock = defineType({
  name: 'f5LogoBlock',
  title: 'Logo Block',
  type: 'object',
  fields: [
    defineField({
      name: 'blockAlignment',
      title: 'Block Alignment',
      description: 'Select the Alignment of the Logo Block',
      type: 'string',
      options: {
        list: Dropdowns.ContentAlignmentOptions,
      },
    }),
    defineField({
      name: 'blockImages',
      title: 'Logo Images',
      type: 'array',
      of: [{type: 'f5Figure'}],
    }),
  ],
})
