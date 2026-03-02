import {defineArrayMember, defineType} from 'sanity'

import {basePageBuilderBlocks} from './f5BasePageBuilder'

export const f5GenericContentPageBuilder = defineType({
  name: 'f5GenericContentPageBuilder',
  type: 'array',
  of: [
    defineArrayMember({type: 'f5GenericContentPageText'}),
    ...basePageBuilderBlocks,
    defineArrayMember({type: 'f5Tabs'}),
    defineArrayMember({type: 'f5CerosProject'}),
    defineArrayMember({type: 'f5LegacyInclude'}),
  ],
})
