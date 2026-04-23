import {defineField, defineType} from 'sanity'
import {extendBlockMarksWithDNT} from '@easyling/sanity-connector'

import {NamingConstants} from '../../constants/namingConstants'
import {Dropdowns} from '../../dialogs/dropdowns'
import {htmlEntities} from '../f5.com/richtext/custom-decorators/htmlEntities'

export const heroData = defineType({
  name: 'heroData',
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
      of: [{type: 'cta'}],
      validation: (rule) => rule.max(2).error('Only two CTAs may be placed in a single Hero'),
    }),
  ],
})
