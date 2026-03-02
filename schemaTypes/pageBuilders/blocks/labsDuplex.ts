import {defineField, defineType} from 'sanity'

import {Dropdowns} from '../../../dialogs/dropdowns'

export const labsDuplex = defineType({
  name: 'labsDuplex',
  title: 'Duplex block (Labs)',
  type: 'object',
  fieldsets: [
    {name: 'left', title: 'Left Side'},
    {name: 'right', title: 'Right Side'},
  ],
  fields: [
    defineField({
      name: 'leftSideType',
      title: 'Content Type',
      type: 'string',
      fieldset: 'left',
      options: {
        list: Dropdowns.SideBySideTypes,
      },
    }),
    defineField({
      name: 'leftSideImage',
      title: 'Left Side Image',
      type: 'image',
      fieldset: 'left',
      hidden: ({parent}) => !(parent?.leftSideType == 'image'),
    }),
    defineField({
      name: 'leftSideReference',
      title: 'Left Side Reference',
      type: 'reference',
      fieldset: 'left',
      to: [{type: 'chart'}, {type: 'teaser'}],
      hidden: ({parent}) => !(parent?.leftSideType == 'reference'),
    }),
    defineField({
      name: 'leftSideRte',
      title: 'Left Side Rich Text',
      type: 'articleBlockContent',
      fieldset: 'left',
      hidden: ({parent}) => !(parent?.leftSideType == 'rte'),
    }),
    defineField({
      name: 'rightSideType',
      title: 'ContentType',
      type: 'string',
      fieldset: 'right',
      options: {
        list: Dropdowns.SideBySideTypes,
      },
    }),
    defineField({
      name: 'rightSideImage',
      title: 'Right Side Image',
      type: 'image',
      fieldset: 'right',
      hidden: ({parent}) => !(parent?.rightSideType == 'image'),
    }),
    defineField({
      name: 'rightSideReference',
      title: 'Right Side Reference',
      type: 'reference',
      fieldset: 'right',
      to: [{type: 'chart'}, {type: 'teaser'}],
      hidden: ({parent}) => !(parent?.rightSideType == 'reference'),
    }),
    defineField({
      name: 'rightSideRte',
      title: 'Right Side Rich Text',
      type: 'articleBlockContent',
      fieldset: 'right',
      hidden: ({parent}) => !(parent?.rightSideType == 'rte'),
    }),
    defineField({
      name: 'layout',
      title: 'Side-by-side layout',
      type: 'string',
      options: {
        list: Dropdowns.SideBySideDisplays,
      },
    }),
  ],
  preview: {
    select: {
      leftType: 'leftSideType',
      rightType: 'rightSideType',
    },
    prepare({leftType, rightType}) {
      const leftTypeDisplay =
        leftType == 'image' ? 'Image' : leftType == 'reference' ? 'Reference' : 'Rich Text'
      const rightTypeDisplay =
        rightType == 'image' ? 'Image' : rightType == 'reference' ? 'Reference' : 'Rich Text'
      return {
        title: `Left Side: ${leftTypeDisplay}`,
        subtitle: `Right Side: ${rightTypeDisplay}`,
      }
    },
  },
})
