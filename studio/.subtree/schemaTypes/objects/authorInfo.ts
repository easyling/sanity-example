import {EditIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'

export const authorInfo = defineType({
  name: 'authorInfo',
  title: 'Author Information',
  type: 'object',
  icon: EditIcon,
  fields: [
    defineField({
      name: NamingConstants.EMAIL_ADDRESS,
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'lastModification',
      title: 'Last modification',
      description: 'The last time this author was updated',
      type: 'datetime',
    }),
    // defineField({
    //   name: 'socialMedia',
    //   title: 'Social Media Accounts',
    //   type: 'reference',
    //   to: {type: 'socialMedia'},
    //   group: 'basic',
    // }),
  ],
  preview: {
    select: {
      title: NamingConstants.JOB_TITLE,
    },
    prepare({title}) {
      return {
        title: title ?? 'No job title',
      }
    },
  },
})
