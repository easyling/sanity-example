import {defineType} from 'sanity'

import {accordionTypes} from './additionalTypes'
import {accordionBlock} from './blocks/accordionBlock'

export const f5AccordionBlockContent = defineType({
  title: 'F5 Accordion Block Content',
  name: 'f5AccordionBlockContent',
  type: 'array',
  of: [accordionBlock, ...accordionTypes],
})
