import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'

export const pressContactInfo = defineType({
  name: 'pressContactInfo',
  title: 'Press Contact Information',
  type: 'object',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: NamingConstants.EMAIL_ADDRESS,
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'lastModification',
      title: 'Last modification',
      description: 'The last time this press contact was updated',
      type: 'datetime',
    }),
  ],
})
