import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'

export const labsLandingPeopleBlock = defineType({
  name: 'labsLandingPeopleBlock',
  title: 'People block',
  type: 'object',
  fields: [
    defineField({
      name: NamingConstants.TITLE,
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'people',
      title: 'People',
      description: 'List of people to be displayed',
      type: 'array',
      of: [{type: 'reference', to: {type: 'individual'}}],
    }),
  ],
  preview: {
    select: {
      people: 'people',
      person_1_firstName: 'people.0.firstName',
      person_1_lastName: 'people.0.lastName',
    },
    prepare({people, person_1_firstName, person_1_lastName}) {
      const numberOfPeople = Object.keys(people).length
      return {
        title: `People block: ${person_1_firstName} ${person_1_lastName}`,
        subtitle: numberOfPeople > 1 ? `and ${numberOfPeople - 1} other people` : ' ',
        media: UsersIcon,
      }
    },
  },
})
