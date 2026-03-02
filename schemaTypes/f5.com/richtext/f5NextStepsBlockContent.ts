import {defineType} from 'sanity'

import {nextStepsTypes} from './additionalTypes'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

export const f5NextStepsBlockContent = defineType({
  title: 'F5 Next Steps Block Content',
  name: 'f5NextStepsBlockContent',
  type: 'array',
  of: [genericContentPageBlock, ...nextStepsTypes],
})
