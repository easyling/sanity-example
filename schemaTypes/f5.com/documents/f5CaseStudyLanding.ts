import {DocumentsIcon, HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5CaseStudyLanding = withDataLayer(
  withSeo(
    defineType({
      name: 'f5CaseStudyLanding',
      title: 'CaseStudy Landing Page',
      type: 'document',
      icon: HomeIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
      ],
      preview: {
        select: {
          title: 'heroData.title',
        },
        prepare({title}) {
          return {
            title: title || 'F5.com Case study Landing Page',
            subtitle: 'Configure Case study page metadata and hero content for F5.com',
          }
        },
      },
    }),
  ),
)
