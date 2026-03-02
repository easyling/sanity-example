import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {CommonWidgets} from '../../../../dialogs/commonWidgets'
import {withDataLayer} from '../../helpers/withDataLayer'
import {withSeo} from '../../helpers/withSeo'
import {Dropdowns} from '../../../../dialogs/dropdowns'

export const f5Demo = withDataLayer(
  withSeo(
    defineType({
      name: 'f5Demo',
      title: 'Demo',
      type: 'document',
      icon: DocumentTextIcon,
      fieldsets: [
        {name: 'dates', title: 'Dates'},
        {name: 'searchFacets', title: 'Search Facets'},
      ],
      fields: [
        defineField({
          ...CommonWidgets.Slug,
          options: {
            source: NamingConstants.TITLE,
            maxLength: 96,
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'hero',
          title: 'Hero',
          description:
            'The hero section shares display elements that appear on the demo card as well. Leave breadcrumb blank. Title & SubTitle are required',
          type: 'f5HeroData',
          validation: (rule) =>
            rule.custom((value, context) => {
              console.log({value, context})
              if (!value?.title?.trim()) {
                return 'Title is required'
              }
              if (!value?.subtitle?.trim()) {
                return 'Subtitle is required'
              }
              return true
            }),
        }),
        defineField({
          name: NamingConstants.DESCRIPTION,
          type: 'text',
          title: 'Demo Description (75-125 words)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'iframeConfig',
          title: 'Demo iFrame Config',
          type: 'cerosProject',
        }),
        /* Search Facets */
        defineField({
          name: 'recomended',
          title: 'Recomended?',
          description: 'Check this box for this demo to be featured in the recomneded sort',
          fieldset: 'searchFacets',
          type: 'boolean',
        }),
        defineField({
          name: 'demoType',
          title: 'Demo Type',
          description: 'Video or Interactive product tour',
          fieldset: 'searchFacets',
          type: 'string',
          options: {
            list: Dropdowns.F5DemoCenterDemoTypes,
          },
        }),
        defineField({
          name: 'productGroup',
          title: 'Product Group',
          fieldset: 'searchFacets',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: Dropdowns.F5DemoCenterProductGroups,
              },
            },
          ],
        }),
        defineField({
          name: 'heroProductCategory',
          title: 'Hero Product Category',
          type: 'string',
          fieldset: 'searchFacets',
          options: {
            list: Dropdowns.ProductCategoryDataLayer,
          },
          validation: (rule) => rule.required().error('Hero Product Category is required'),
        }),
        defineField({
          name: 'platformDomain',
          title: 'Platform Domain',
          type: 'string',
          fieldset: 'searchFacets',
          options: {
            list: Dropdowns.F5DemoCenterPlatformDomains,
          },
          validation: (rule) => rule.required().error('Platform Domain is required'),
        }),
        defineField({
          name: 'solutionAreas',
          title: 'Solution Area(s)',
          fieldset: 'searchFacets',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: Dropdowns.F5DemoCenterSolutionAreas,
              },
            },
          ],
          validation: (rule) => rule.min(1).error('Select at least one solution area'),
        }),
        defineField({
          name: 'architectureRelevance',
          title: 'Architecture Relevance',
          type: 'array',
          fieldset: 'searchFacets',
          of: [{type: 'string', options: {list: Dropdowns.F5DemoCenterArchitectureRelevance}}],
          validation: (rule) =>
            rule.min(1).error('Select at least one architecture relevance area'),
        }),
        defineField({
          name: 'eduLevel',
          title: 'Education Level',
          fieldset: 'searchFacets',
          type: 'string',
          options: {
            list: Dropdowns.F5DemoCenterEduLevel,
          },
        }),
        /* End Search Facets */

        defineField({
          name: 'heroProduct',
          title: 'Hero Product',
          type: 'reference',
          to: [
            {
              title: 'Reference to and F5 product',
              type: 'f5GenericContentPage',
              options: {
                disableNew: true,
                filter: '_type == "f5GenericContentPage" && pageLocation == "products"',
              },
            },
          ],
        }),

        defineField({
          type: 'array',
          name: 'relatedProducts',
          title: 'Related Products',
          description: 'Select a maximum of 3 related products',
          of: [
            {
              type: 'reference',
              to: {type: 'f5GenericContentPage'},
              title: 'Reference to and F5 product',
              options: {
                disableNew: true,
                filter: '_type == "f5GenericContentPage" && pageLocation == "products"',
              },
            },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        defineField({
          name: NamingConstants.PUBLISH_DATE,
          title: 'Publish date',
          type: 'datetime',
          fieldset: 'dates',
          validation: (rule) => rule.required().error('All articles must include a publish date'),
        }),
        defineField({
          name: NamingConstants.LAST_MODIFICATION,
          title: 'Last significant modification',
          description:
            'The last time this article was significantly updated (more than just a typo fix)',
          type: 'datetime',
          fieldset: 'dates',
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Rich Text Content',
          description: 'Will appear at the bottom of the page (Use for Form section)',
          type: 'f5GenericContentPageText',
        }),
      ],
      preview: {
        select: {
          title: 'hero.title',
          publishDate: NamingConstants.PUBLISH_DATE,
        },
        prepare({title, publishDate}) {
          return {
            title,
            subtitle: new Date(publishDate).toLocaleDateString(),
          }
        },
      },
    }),
  ),
)
