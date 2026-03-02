import {defineType} from 'sanity'

import {tabsTypes} from './additionalTypes'
import {kitchenSinkBlock} from './blocks/kitchenSinkBlock'

/**
 * F5 Tabs Block Content is a specialized version of Kitchen Sink Block Content
 * that excludes the tabs component to prevent nesting. This ensures that content
 * editors cannot create tabs within tabs, which would create a poor user experience.
 *
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'f5TabsBlockContent'
 *  }
 */
export const f5TabsBlockContent = defineType({
  title: 'F5 Tabs Block Content',
  name: 'f5TabsBlockContent',
  type: 'array',
  of: [
    kitchenSinkBlock,
    // Include all additional types EXCEPT tabs to prevent nesting
    ...tabsTypes,
  ],
})
