import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CompoundNames, NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'

export const webinar = defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'Webinar title',
      validation: (rule) => rule.required().error('All Webinars must have a title'),
    }),
    defineField({
      name: NamingConstants.EVENT,
      title: 'Event Info',
      description: 'The core event information for this webinar',
      type: 'eventInfo',
      validation: (rule) => rule.required().error('All Webinars must include event information'),
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      startDate: CompoundNames.EVENT_START_DATE,
    },
    prepare({title, startDate}) {
      return {
        title,
        subtitle: new Date(startDate).toLocaleDateString(),
      }
    },
  },
})
