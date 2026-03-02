import {CaseIcon, DocumentsIcon, PanelRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5CaseStudy = withDataLayer(
  withSeo(
    defineType({
      name: 'f5CaseStudy',
      title: 'Case Study',
      type: 'document',
      icon: CaseIcon,
      groups: [
        {name: 'metadata', title: 'Metadata', icon: DocumentsIcon},
        {name: 'sidebar', title: 'SideBar', icon: PanelRightIcon},
      ],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          validation: (rule) => rule.required().error('A case study must have a title'),
        }),
        defineField({
          ...CommonWidgets.Slug,
        }),
        defineField({
          name: 'isFeatured',
          title: 'Featured Case Study',
          description: 'If selected, this Case Study will appear in lists of featured items',
          type: 'boolean',
          initialValue: false,
          group: 'metadata',
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Page Content',
          type: 'f5CaseStudyBlockContent',
          validation: (rule) => rule.required().error('Case studies must include page content'),
        }),
        defineField({
          ...CommonWidgets.Description,
          title: 'Abstract',
          description: 'Short description of the content',
          group: 'metadata',
        }),
        defineField({
          name: 'industry',
          description: 'Industry',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: Dropdowns.f5CaseStudyIndustries,
              },
            },
          ],
          group: 'metadata',
        }),
        defineField({
          name: 'pillars',
          description: 'Pillar',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: Dropdowns.f5CaseStudyPillars,
              },
            },
          ],
          group: 'metadata',
        }),
        defineField({
          name: 'region',
          description: 'Region',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: Dropdowns.f5CaseStudyRegions,
              },
            },
          ],
          group: 'metadata',
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
        defineField({
          group: 'sidebar',
          title: 'Logo',
          description: 'Logo of the subject of the Case Study',
          name: 'logo',
          type: 'image',
        }),
        defineField({
          name: 'challenges',
          description: 'Challenges',
          type: 'array',
          of: [
            {
              type: 'string',
            },
          ],
          group: 'sidebar',
          validation: (rule) => rule.max(4),
        }),
        defineField({
          name: 'benefits',
          description: 'Benefits',
          type: 'array',
          of: [
            {
              type: 'string',
            },
          ],
          group: 'sidebar',
          validation: (rule) => rule.max(4),
        }),
        defineField({
          name: NamingConstants.CTA,
          title: 'Call(s) to Action',
          description: 'Links to product sections',
          group: 'sidebar',
          type: 'array',
          of: [{type: 'f5Cta'}],
        }),
      ],
      preview: {
        select: {
          title: NamingConstants.TITLE,
          media: 'logo',
        },
        prepare({title, media}) {
          return {
            title,
            media,
          }
        },
      },
    }),
  ),
)
