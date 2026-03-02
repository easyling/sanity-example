import {defineType} from 'sanity'

import {eventTypes} from './additionalTypes'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

/**
 * The Kitchen Sink Block Content is meant to be a playground for devs/content
 * editors to see ALL possible options for a Block Content/Rich Text Editor
 * component. Most likely, this will not be used in any production-ready
 * data models. Instead, we should create additional Block Content items that
 * contain subsets of the capabilities in the Kitchen Sink to provide a more
 * user-friendly experience.
 *
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'f5KitchenSinkBlockContent'
 *  }
 */
export const f5EventBlockContent = defineType({
  title: 'F5 Event Block Content',
  name: 'f5EventBlockContent',
  type: 'array',
  of: [
    genericContentPageBlock,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...eventTypes,
  ],
})
