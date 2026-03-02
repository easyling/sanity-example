import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {f5BrandColorList, f5BrandColors} from '../../../utils/color'

export const marketoData = defineType({
  name: 'marketoData',
  title: 'Marketo Form',
  type: 'object',
  fields: [
    defineField({
      name: NamingConstants.MARKETO_FORM_ID,
      title: 'Marketo Form ID',
      description: 'Include to add a Marketo form to the page Hero',
      type: 'number',
    }),
    defineField({
      name: NamingConstants.TITLE,
      title: 'Marketo Form Title',
      type: 'string',
    }),
    defineField({
      name: 'successMessage',
      title: 'Marketo Form Success Message',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      formId: NamingConstants.MARKETO_FORM_ID,
    },
    prepare({formId}) {
      return {
        title: `Marketo Form (ID: ${formId})`,
      }
    },
  },
})
