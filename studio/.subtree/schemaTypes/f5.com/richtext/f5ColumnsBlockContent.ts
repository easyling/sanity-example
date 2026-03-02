import {defineType} from 'sanity'

import {genericContentPageTypes} from './additionalTypes'
import {logoBlock} from './additionalTypes/logoBlock'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

/**
 * The Columns Content Page Block Content is meant to be used in the
 * F5 Columns component
 *
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'f5ColumnsBlockContent'
 *  }
 */
export const f5ColumnsBlockContent = defineType({
  title: 'F5 Columns Block Content',
  name: 'f5ColumnsBlockContent',
  type: 'array',
  of: [
    genericContentPageBlock,
    logoBlock,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...genericContentPageTypes,
  ],
})
