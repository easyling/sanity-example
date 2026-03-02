import {DocumentIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5GenericContentPage = withDataLayer(
  withSeo(
    defineType({
      name: 'f5GenericContentPage',
      title: 'Generic Content Page',
      type: 'document',
      icon: DocumentIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          validation: (rule) => rule.required().error('All pages must have a title'),
        }),
        defineField({
          ...CommonWidgets.Slug,
          options: {
            source: NamingConstants.TITLE,
            maxLength: 96,
            //@ts-ignore
            isUnique: async (slug, context) => {
              const {document, getClient} = context
              type GenericContentPageDocument = {
                _id: string
                pageLocation?: string
                slug?: {
                  current: string
                }
              }
              const client = getClient({apiVersion: '2025-07-28'})
              const doc = document as GenericContentPageDocument
              // Check for `language` in the current document
              const {_id, pageLocation} = doc
              // If the `slug` is not defined, skip validation
              if (!slug || !pageLocation) {
                return true
              }
              // Build the query for slug conflicts
              let query = `*[!(_id in path('drafts.**')) && slug.current == $slug` // Check for the same slug
              const params: Record<string, string> = {
                slug,
              }
              if (_id) {
                // Normalize the ID to handle drafts
                const normalizedId = _id.startsWith('drafts.')
                  ? _id.replace('drafts.', '') // Remove "drafts." prefix
                  : _id
                // Exclude the current document by its ID (to handle editing scenarios)
                query += ` && _id != $id `
                params.id = normalizedId
              }
              // Ensure `slug` collision considers `language`
              query += ` && pageLocation == $pageLocation]{_id, slug, pageLocation}`
              params.pageLocation = pageLocation
              // Query the Sanity dataset for conflicts
              const result = await client.fetch(query, params)
              // Ensure the slug is unique if no conflict is found
              return result.length === 0
            },
          },
          validation: (rule) => [
            rule.required().error('All pages must have a slug'),
            rule.custom((slug: {current: string}) => {
              if (!slug?.current) return true // required rule will handle empty
              if (/\s/.test(slug.current)) return 'Slug cannot contain spaces'
              return true
            }),
          ],
        }),

        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Page Content',
          type: 'f5GenericContentPageBuilder',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          name: 'pageLocation',
          title: 'Page Location',
          description:
            'Choose the location within the site that best fits your content. This will determine the URL of the page.',
          type: 'string',
          options: {
            list: Dropdowns.f5ComPageLocations,
          },
          group: 'metadata',
          validation: (rule) => rule.required().error('All pages must have a page location'),
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
      ],
      preview: {
        select: {
          title: NamingConstants.TITLE,
          media: 'main',
        },
        prepare({title, media}) {
          return {
            title: title,
            media: media,
          }
        },
      },
    }),
  ),
)
