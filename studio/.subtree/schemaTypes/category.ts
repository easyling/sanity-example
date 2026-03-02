import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'
import {isAdmin, isDev} from '../utils/roles'

export const category = defineType({
  name: 'category',
  title: 'Tags',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      ...CommonWidgets.Title,
      description: 'Name of the Category',
      validation: (rule) => rule.required().error('All categories must have a title'),
    }),
    defineField({
      ...CommonWidgets.Slug,
      validation: (rule) => rule.required(),
      readOnly: ({document, currentUser}) => {
        if (isAdmin(currentUser) || isDev(currentUser))
          // devs and admins can always update
          return false

        if (document?._id.includes('drafts')) return false // allow editing until published for all users
        return true
      },
    }),
    defineField({
      ...CommonWidgets.Description,
    }),
  ],
  preview: {
    select: {
      title: NamingConstants.TITLE,
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
