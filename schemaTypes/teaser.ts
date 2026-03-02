import {ConfettiIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CompoundNames, NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'
import {Dropdowns} from '../dialogs/dropdowns'

export const teaser = defineType({
  name: 'teaser',
  title: 'Teaser',
  type: 'document',
  icon: ConfettiIcon,
  fields: [
    defineField({
      name: NamingConstants.PRIMARY_TEXT,
      title: 'Primary Text',
      type: 'string',
    }),
    defineField({
      name: NamingConstants.SECONDARY_TEXT,
      title: 'Secondary Text',
      type: 'string',
    }),
    defineField({
      ...CommonWidgets.Image,
    }),
    defineField({
      name: NamingConstants.CTA,
      title: 'Call to Action',
      type: 'array',
      of: [
        {
          type: NamingConstants.CTA,
        },
      ],
      validation: (rule) => [
        rule.required().min(1).error('All teasers must have at least one Call to Action'),
        rule.max(1).error('Only one Call to Action is currently supported'),
      ],
    }),
    defineField({
      name: 'context',
      title: 'Context',
      description: 'Hint to the front-end as to what this content is',
      type: 'string',
      options: {
        list: Dropdowns.TeaserContexts,
      },
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.PRIMARY_TEXT,
      subtitle: CompoundNames.CTA_LINK_URL,
      media: NamingConstants.IMAGE,
    },
  },
})
