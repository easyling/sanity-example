import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {Dropdowns} from '../../dialogs/dropdowns'

export const tabsInfo = defineType({
  name: 'tabsInfo',
  title: 'Tabs Component',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Section Background Color',
      description: 'Choose the background color',
      type: 'string',
      options: {
        list: Dropdowns.f5BackgroundColors,
      },
      initialValue: 'bg-ash',
    }),
    defineField({
      name: 'componentTitle',
      title: 'Component Title',
      type: 'string',
      description: 'The main title displayed above the tabs (optional)',
      validation: (rule) => rule.max(100).warning('Title should be less than 100 characters.'),
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tab',
          title: 'Tab',
          fields: [
            defineField({
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              validation: (rule) => rule.required().error('Tab title is required.'),
            }),
            defineField({
              name: 'anchorName',
              title: 'Anchor Name',
              type: 'slug',
              description: 'Used for URL navigation and accessibility',
              options: {
                source: (doc, context) => {
                  //@ts-ignore
                  return context.parent?.title
                },
                maxLength: 96,
              },
              validation: (rule) => [
                rule.required().error('Anchor name is required.'),
                rule.custom((value) => {
                  const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
                  const stringVal = value?.current ?? ''
                  if (!pattern.test(stringVal)) {
                    return 'Slug can only contain lowercase letters, numbers, and hyphens. No slashes or special characters allowed.'
                  }
                  return true
                }),
              ],
            }),
            defineField({
              name: 'content',
              title: 'Tab Content',
              type: 'f5TabsBlockContent',
              validation: (rule) => rule.required().error('Tab content is required.'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              anchorName: 'anchorName.current',
            },
            prepare({title, anchorName}) {
              return {
                title: title || 'Untitled Tab',
                subtitle: anchorName ? `Anchor: ${anchorName}` : 'No anchor name',
              }
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error('At least one tab is required.'),
    }),
  ],
  preview: {
    select: {
      componentTitle: 'componentTitle',
      tabs: 'tabs',
    },
    prepare({componentTitle, tabs = []}) {
      return {
        title: componentTitle || 'Tabs Component',
        subtitle: `${tabs.length} tab${tabs.length === 1 ? '' : 's'}`,
        media: DocumentTextIcon,
      }
    },
  },
})
