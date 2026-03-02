import {defineType} from 'sanity'

import {glossaryTypes} from './additionalTypes'
import {glossaryBlock} from './blocks/glossaryBlock'

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
export const f5GlossaryTermBlockContent = defineType({
  title: 'F5 Glossary Term Block Content',
  name: 'f5GlossaryTermBlockContent',
  type: 'array',
  of: [
    glossaryBlock,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...glossaryTypes,
  ],
})
