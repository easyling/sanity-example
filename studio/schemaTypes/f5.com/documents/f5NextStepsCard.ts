import {InlineElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5NextStepsCard = defineType({
  name: 'f5NextStepsCard',
  title: 'Next Steps Card',
  type: 'document',
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: 'card',
      title: 'Card',
      type: 'f5Card',
      validation: (rule) => rule.required().error('A card is required'),
    }),
  ],
  preview: {
    select: {
      title: 'card.primaryText',
      subtitle: 'card.secondaryText',
      action: 'card.action',
    },
    prepare: ({title, subtitle, action}) => ({
      title: title || 'Next Steps Card',
      subtitle: [subtitle, action].filter(Boolean).join(' • '),
    }),
  },
})
