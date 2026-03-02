import {defineType} from 'sanity'

import {allAdditionalTypes} from './additionalTypes'
import block from './additionalTypes/block'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'articleBlockContent'
 *  }
 */
export const labsArticleBlockContent = defineType({
  title: 'Article Block Content',
  name: 'articleBlockContent',
  type: 'array',
  of: [
    block,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...allAdditionalTypes,
  ],
})
