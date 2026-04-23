import {defineField, defineType} from 'sanity'
import {extendBlockMarksWithDNT} from '@easyling/sanity-connector'

import {NamingConstants} from '../../constants/namingConstants'
import {Dropdowns} from '../../dialogs/dropdowns'
import {htmlEntities} from '../f5.com/richtext/custom-decorators/htmlEntities'

export const employeeInfo = defineType({
  name: 'employeeInfo',
  title: 'F5 Employee Information',
  type: 'object',
  fields: [
    defineField({
      name: NamingConstants.JOB_TITLE,
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'leadershipIndicators',
      title: 'Leadership Indicators',
      description: 'Select all leadership roles that apply to this employee',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: Dropdowns.LeadershipIndicators,
          },
        },
      ],
    }),
    defineField({
      name: NamingConstants.BIOGRAPHY,
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: extendBlockMarksWithDNT({
            decorators: htmlEntities,
          }),
        },
      ],
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
      description: 'The last time this employee was updated',
      type: 'datetime',
    }),
    // TODO: Add social media fields when clarified by business
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
      leadership: 'leadershipIndicators',
    },
    prepare({title, leadership}) {
      const leadershipText =
        leadership && leadership.length > 0 ? ` (${leadership.join(', ')})` : ''
      return {
        title: (title ?? 'No job title') + leadershipText,
      }
    },
  },
})
