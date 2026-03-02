import {ChevronDownIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

export const accordionSection = defineArrayMember({
  name: 'accordionSection',
  title: 'Accordion',
  type: 'object',
  icon: ChevronDownIcon,
  fields: [
    defineField({
      name: 'accordions',
      title: 'Accordion',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'accordion',
          title: 'Accordion',
          fields: [
            defineField({
              name: 'content',
              title: 'Accordion Content',
              type: 'f5AccordionInfo',
              validation: (rule) => rule.required().error('Accordion content is required.'),
            }),
          ],
          preview: {
            select: {
              title: 'content.title',
            },
            prepare({title}) {
              return {
                title: title || 'Untitled Accordion',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      accordions: 'accordions',
    },
    prepare({accordions}) {
      return {
        title: 'Accordion',
        subtitle: `${accordions.length} accordion${accordions.length === 1 ? '' : 's'}`,
      }
    },
  },
})

export default accordionSection
