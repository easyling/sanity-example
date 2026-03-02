import {defineType} from 'sanity'

import {caseStudyTypes} from './additionalTypes'
import {genericContentPageBlock} from './blocks/genericContentPageBlock'

/**
 * The Case Study Block Content is meant to be used on the
 * F5 Case Study Page
 *
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'f5GenericContentPageBlockContent'
 *  }
 */
export const f5CaseStudyBlockContent = defineType({
  title: 'F5 Case Study Block Content',
  name: 'f5CaseStudyBlockContent',
  type: 'array',
  of: [
    genericContentPageBlock,
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    ...caseStudyTypes,
  ],
})
