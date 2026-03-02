import {defineType} from 'sanity'

import {baseTypes} from './additionalTypes'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'labsBlockContent'
 *  }
 */
export const f5BaseBlockContent = defineType({
  title: 'F5.com Base Block Content',
  name: 'f5BaseBlockContent',
  type: 'array',
  of: [
    genericContentPageBlock,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...baseTypes,
  ],
})
