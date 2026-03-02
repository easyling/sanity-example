import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {CommonWidgets} from '../../dialogs/commonWidgets'

export const eventInfo = defineType({
  name: 'eventInfo',
  title: 'Event Information',
  type: 'object',
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'Event title',
    }),
    defineField({
      ...CommonWidgets.Description,
      description: 'Event description',
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      description: 'People who will be speaking at this event',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'individual'},
          options: {filter: '_type == "individual" && "speaker" in roles'},
        },
      ],
    }),
    defineField({
      name: NamingConstants.START_DATE,
      title: 'Start Date',
      description: 'Start date/time of the event',
      type: 'datetime',
      validation: (rule) => rule.required().error('All events must have a start date'),
    }),
    defineField({
      name: NamingConstants.END_DATE,
      title: 'End Date',
      description: 'End date/time of the event',
      type: 'datetime',
    }),
    defineField(CommonWidgets.Categories),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
      date: NamingConstants.START_DATE,
      speakers: 'speakers',
    },
    prepare({title, date, speakers}) {
      const speakersText =
        speakers && speakers.length > 0
          ? ` (${speakers.length} speaker${speakers.length > 1 ? 's' : ''})`
          : ''
      return {
        title: (title ?? 'No title') + speakersText,
        subtitle: new Date(date).toLocaleDateString(),
      }
    },
  },
})
