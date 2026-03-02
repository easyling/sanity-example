import {defineArrayMember, defineType} from 'sanity'

import {basePageBuilderBlocks} from './f5BasePageBuilder'

export const f5KitchenSinkPageBuilder = defineType({
  name: 'f5KitchenSinkPageBuilder',
  type: 'array',
  of: [
    defineArrayMember({type: 'f5KitchenSinkText'}),
    defineArrayMember({type: 'f5KitchenSinkTextImage'}),
    ...basePageBuilderBlocks,
    defineArrayMember({type: 'f5Tabs'}),
    defineArrayMember({type: 'f5CtaBlock'}),
    defineArrayMember({type: 'f5CerosProject'}),
    defineArrayMember({type: 'f5LegacyInclude'}),
  ],
})
