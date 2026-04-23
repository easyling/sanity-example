import {defineField, defineType} from 'sanity'
import {extendBlockMarksWithDNT} from '@easyling/sanity-connector'

import {NamingConstants} from '../../../constants/namingConstants'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {localAlertBanner} from '../../objects/alertBanners'
import {htmlEntities} from '../richtext/custom-decorators/htmlEntities'

export const f5HeroData = defineType({
  name: 'f5HeroData',
  title: 'Hero Display Content',
  type: 'object',
  fields: [
    defineField({
      name: 'breadcrumb',
      title: 'Breadcrumb',
      type: 'string',
      // @ts-ignore
      readOnly: ({document}) => document?.disableBreadcrumb,
      options: {
        list: Dropdowns.BreadcrumbOptions,
      },
      hidden: ({document}) => {
        return ['f5Demo', 'f5DemoLanding'].includes(document?._type || '')
      },
    }),
    defineField({
      name: 'customBreadcrumbText',
      title: 'Custom Breadcrumb Text',
      type: 'string',
      hidden: ({parent}) => parent?.breadcrumb !== 'custom',
    }),
    defineField({
      name: NamingConstants.TITLE,
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: NamingConstants.SUBTITLE,
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      description: 'Rich text content for the hero section',
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
      name: NamingConstants.IMAGE,
      title: 'Hero Image',
      description: 'Image displayed in the hero section',
      type: 'image',
    }),
    defineField({
      name: NamingConstants.CTA,
      title: 'Call(s) to Action',
      description: 'Two or fewer CTAs to be used in the Hero',
      type: 'array',
      of: [{type: 'f5Cta'}],
      validation: (rule) => rule.max(2).error('Only two CTAs may be placed in a single Hero'),
    }),
    defineField(localAlertBanner),
    defineField({
      name: 'marketo',
      title: 'Marketo Data (Hero)',
      type: 'marketoData',
      hidden: ({document}) => {
        return ['f5Demo', 'f5DemoLanding'].includes(document?._type || '')
      },
    }),
    defineField({
      name: 'cardBlock',
      title: 'Hero Card Block',
      type: 'f5CardBlock',
      description:
        'Allows the placement of 1 - 4 cards in the bottom of the hero section. Alignment and Card varition default to "text-left" and "complex" respectively.',
      initialValue: () => ({
        cardContentAlignment: 'text-left',
        cardVariation: 'complex',
      }),
      validation: (Rule) =>
        Rule.custom((field: {cards: any[]}) => {
          // Ensure `cards` exists and has a maximum length of 4
          if (field?.cards?.length > 4) {
            return 'Only 4 cards may be displayed in the hero'
          }
          return true // Validation passed
        }),
      hidden: ({document}) => {
        return ['f5Demo', 'f5DemoLanding'].includes(document?._type || '')
      },
    }),
  ],
})
