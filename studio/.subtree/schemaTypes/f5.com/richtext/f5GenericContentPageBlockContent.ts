import {defineType} from 'sanity'

import {genericContentPageTypes} from './additionalTypes'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

/**
 * The Generic Content Page Block Content is meant to be used on the
 * F5 Generic Content Page
 *
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'f5GenericContentPageBlockContent'
 *  }
 */
export const f5GenericContentPageBlockContent = defineType({
  title: 'F5 Generic Content Page Block Content',
  name: 'f5GenericContentPageBlockContent',
  type: 'array',
  of: [
    genericContentPageBlock,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...genericContentPageTypes,
  ],
})
