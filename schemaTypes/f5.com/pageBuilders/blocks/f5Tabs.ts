import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5Tabs = defineType({
  name: 'f5Tabs',
  title: 'F5 Tabs Component',
  type: 'object',
  fields: [
    defineField({
      name: 'tabsComponent',
      title: 'Tabs Component',
      type: 'tabsInfo',
      validation: (rule) => rule.required().error('Tabs component is required.'),
    }),
  ],
  preview: {
    select: {
      tabs: 'tabsComponent.tabs',
    },
    prepare({tabs = []}) {
      return {
        title: 'F5 Tabs Component',
        subtitle: `${tabs.length} tab${tabs.length === 1 ? '' : 's'}`,
        media: DocumentTextIcon,
      }
    },
  },
})
