import {CalendarIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5Events = withDataLayer(
  withSeo(
    defineType({
      name: 'f5Events',
      title: 'Events',
      type: 'document',
      icon: CalendarIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          validation: (rule) => rule.required().error('An event must have a title'),
        }),
        defineField({
          ...CommonWidgets.Slug,
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          name: 'eventType',
          title: 'Event type',
          description: 'Choose the type of event',
          type: 'string',
          options: {
            list: Dropdowns.F5EventTypes,
          },
        }),
        defineField({
          name: 'eventStartTime',
          title: 'Event Start Date and Time',
          type: 'datetime',
          validation: (rule) =>
            rule.custom((startDateString, context) => {
              //@ts-ignore
              const endDateString = context.parent?.eventEndTime
              if (!startDateString || !endDateString) {
                return true
              } else {
                const startDate = new Date(startDateString)
                const endDate = new Date(endDateString)
                if (startDate.getTime() - endDate.getTime() <= 0) {
                  return true
                } else {
                  return 'Start Date must be before End Date'
                }
              }
            }),
        }),
        defineField({
          name: 'eventEndTime',
          title: 'Event End Date and Time',
          type: 'datetime',
          validation: (rule) =>
            rule.custom((endDateString, context) => {
              //@ts-ignore
              const startDateString = context.parent?.eventStartTime
              if (!startDateString || !endDateString) {
                return true
              } else {
                const startDate = new Date(startDateString)
                const endDate = new Date(endDateString)
                if (startDate.getTime() - endDate.getTime() <= 0) {
                  return true
                } else {
                  return 'End Date must be after Start Date'
                }
              }
            }),
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Event Description',
          type: 'f5EventBlockContent',
        }),
        defineField({
          name: 'keyLearnings',
          description: 'Key Learnings',
          type: 'array',
          of: [
            {
              type: 'string',
            },
          ],
          validation: (rule) => rule.max(3).error('Up to 3 Key Learnings are supported'),
        }),
        defineField({
          name: 'presenters',
          title: 'Presenters',
          description: 'List of presenters to be displayed',
          type: 'array',
          of: [{type: 'reference', to: {type: 'individual'}}],
        }),
        defineField({
          title: 'Logo',
          name: 'logo',
          type: 'image',
        }),
        defineField({
          title: 'Disclaimer Text',
          name: 'disclaimer',
          type: 'f5EventBlockContent',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
      ],
    }),
  ),
)
