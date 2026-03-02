import {defineArrayMember, defineType} from 'sanity'

import {basePageBuilderBlocks} from './f5BasePageBuilder'

export const f5EventsLandingPageBuilder = defineType({
  name: 'f5EventsLandingPageBuilder',
  title: 'Events Landing Page Builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'f5GenericContentPageText'}),
    ...basePageBuilderBlocks,
    defineArrayMember({type: 'f5Tabs'}),
    defineArrayMember({type: 'f5CerosProject'}),
    defineArrayMember({type: 'f5LegacyInclude'}),
  ],
})
