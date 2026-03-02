import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {Dropdowns} from '../../../../dialogs/dropdowns'

export const f5CardBlock = defineType({
  name: 'f5CardBlock',
  title: 'Card(s) Block',
  type: 'object',
  icon: BlockElementIcon,
  description: 'Allows the placement of 1 or more cards on the page',
  fields: [
    defineField({
      name: 'cardVariation',
      title: 'Card Variation',
      description: 'Choose what variation of card this block will hold',
      type: 'string',
      options: {
        list: Dropdowns.F5CardVariations,
      },
      initialValue: 'narrow',
    }),
    defineField({
      name: 'cardContentAlignment',
      title: 'Card Content Alignment',
      description: 'Choose how the content inside the cards will be aligned',
      type: 'string',
      options: {
        list: Dropdowns.ContentAlignmentOptions,
      },
      initialValue: 'text-center',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'f5Card',
        },
      ],
    }),
  ],
  preview: {
    select: {
      type: 'cardVariation',
      cards: 'cards',
    },
    prepare({type, cards}) {
      const cardType = String(type).charAt(0).toUpperCase() + String(type).slice(1)
      const numberOfCards = cards?.length ?? 0
      return {
        title: `${cardType} Card Block`,
        subtitle: `${numberOfCards} cards`,
      }
    },
  },
})
