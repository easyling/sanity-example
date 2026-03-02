import {defineType} from 'sanity'

import {allAdditionalTypes, glossaryTypes} from './additionalTypes'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

// de-dupe
export const blockTypesSet = new Set<any>([
  genericContentPageBlock,
  ...allAdditionalTypes,
  ...glossaryTypes,
])

export const f5BlogBlockContent = defineType({
  title: 'F5.com Blog Block Content',
  name: 'f5BlogBlockContent',
  type: 'array',
  of: Array.from(blockTypesSet),
})
