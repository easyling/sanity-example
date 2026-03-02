import {DashboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {CommonWidgets} from '../../dialogs/commonWidgets'

export const labsLandingPage = defineType({
  name: 'labsLandingPage',
  title: 'Labs Landing Page',
  type: 'document',
  icon: DashboardIcon,
  fields: [
    defineField({
      ...CommonWidgets.Title,
      validation: (rule) => rule.required().error('All Landing Pages must have a title'),
    }),
    defineField({
      name: 'titleBannerBgImage',
      title: 'Title banner background image',
      description: 'Background image that will appear behind the title',
      type: 'image',
    }),
    defineField({
      ...CommonWidgets.Slug,
      options: {
        source: NamingConstants.TITLE,
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('All Landing Pages must have a slug'),
    }),
    defineField({
      ...CommonWidgets.Description,
      description: 'A brief description of the page',
    }),
    defineField({
      name: NamingConstants.BLOCK_CONTENT,
      type: 'labsLandingPageBuilder',
      validation: (rule) => rule.required().error('All Landing Pages must have content'),
    }),
    defineField({
      ...CommonWidgets.Categories,
    }),
    defineField({
      ...CommonWidgets.MetaRobots,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
