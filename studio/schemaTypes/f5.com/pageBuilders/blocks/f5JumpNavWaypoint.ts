import {ArrowDownIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {Dropdowns} from '../../../../dialogs/dropdowns'

export const f5JumpNavWaypoint = defineType({
  name: 'f5JumpNavWaypoint',
  title: 'Jump Nav Waypoint',
  type: 'object',
  icon: ArrowDownIcon,
  fields: [
    defineField({
      name: NamingConstants.PRIMARY_TEXT,
      title: 'Heading (H2) text',
      description: 'This will appear as the regular heading in the content',
      type: 'string',
      validation: (rule) => rule.required().error('You must provide Heading text'),
    }),
    defineField({
      name: NamingConstants.SECONDARY_TEXT,
      title: 'Navigation text',
      description: 'This will appear in the JumpNav; keep it short!',
      type: 'string',
      validation: (rule) => rule.required().error('You must provide Navigation text'),
    }),
    defineField({
      name: 'headingAlignment',
      title: 'Header Alignment',
      description: 'Choose how the header will be aligned',
      type: 'string',
      options: {
        list: Dropdowns.ContentAlignmentOptions,
      },
      initialValue: 'text-center',
    }),
    defineField({
      name: 'anchorName',
      title: 'Anchor Name',
      description: 'This will appear in the url, (following the #)',
      type: 'slug',
      options: {
        source: (doc, context) => {
          //@ts-ignore
          return context.parent[`${NamingConstants.SECONDARY_TEXT}`]
        },
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error('You must provide Anchor text'),
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
  ],
})
