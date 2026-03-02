import {ChevronDownIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {CommonWidgets} from '../../../../dialogs/commonWidgets'

export const f5AccordionInfo = defineType({
  title: 'Accordion Info',
  name: 'f5AccordionInfo',
  type: 'object',
  icon: ChevronDownIcon,
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'Accordion title',
      validation: (rule) => rule.required().error('The Accordion must include a title'),
    }),
    defineField({
      title: 'Text',
      name: NamingConstants.BLOCK_CONTENT,
      type: 'f5AccordionBlockContent',
      validation: (rule) => rule.required().error('The Accordion must include text'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
