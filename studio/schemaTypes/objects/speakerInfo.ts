import {MicrophoneIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'

export const speakerInfo = defineType({
  name: 'speakerInfo',
  title: 'Speaker Information',
  type: 'object',
  icon: MicrophoneIcon,
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
      description: 'The last time this speaker information was updated',
      type: 'datetime',
    }),
    // TODO: Add social media fields when clarified by Biz
    // defineField({
    //   name: 'socialMedia',
    //   title: 'Social Media Accounts',
    //   type: 'reference',
    //   to: {type: 'socialMedia'},
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
