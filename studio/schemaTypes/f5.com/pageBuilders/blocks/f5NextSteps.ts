import {ArrowRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5NextSteps = defineType({
  name: 'f5NextSteps',
  title: 'Next Steps',
  type: 'object',
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: 'cardContentAlignment',
      title: 'Card Content Alignment',
      description: 'Choose how the content inside the cards will be aligned',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'cards',
      title: 'Reusable Cards',
      description: 'Reference or create Next Steps cards inline',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'f5NextStepsCard'}], weak: true}],
      options: {layout: 'list'},
    }),
  ],
  preview: {
    select: {cards: 'cards'},
    prepare: ({cards}) => {
      const count = Array.isArray(cards) ? cards.length : 0
      return {title: `Next Steps (${count} item${count === 1 ? '' : 's'})`}
    },
  },
})
