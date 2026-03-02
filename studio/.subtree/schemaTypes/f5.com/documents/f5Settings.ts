import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {siteWideAlertBanner} from '../../objects/alertBanners'

export const f5Settings = defineType({
  name: 'f5Settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'f5LinkGroup',
      title: 'Footer Links',
      type: 'f5LinkGroup',
    }),
    defineField(siteWideAlertBanner),
  ],
  preview: {
    prepare({}) {
      return {title: 'F5.com Settings'}
    },
  },
})
