import {DocumentIcon, DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {Dropdowns} from '../../../dialogs/dropdowns'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5GoPage = withDataLayer(
  withSeo(
    defineType({
      name: 'f5GoPage',
      title: 'Go Page',
      type: 'document',
      icon: DocumentIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          validation: (rule) => rule.required().error('All Go Pages must have a title'),
        }),
        defineField({
          name: NamingConstants.SLUG,
          title: 'Slug',
          type: 'slug',
          options: {
            source: NamingConstants.TITLE,
            maxLength: 96,
            isUnique: async (slug, context) => {
              const {document, getClient} = context
              type GoPageDocument = {
                _id: string
                language?: string
                slug?: {
                  current: string
                }
              }

              const client = getClient({apiVersion: '2025-07-28'})
              const doc = document as GoPageDocument
              // Check for `language` in the current document
              const {_id, language} = doc

              // If the `slug` is not defined, skip validation
              if (!slug || !language) {
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
              query += ` && language == $language]{_id, slug, language}`
              params.language = language

              // Query the Sanity dataset for conflicts
              const result = await client.fetch(query, params)

              // Ensure the slug is unique if no conflict is found
              return result.length === 0
            },
          },
          validation: (rule) => [
            rule.custom((value) => {
              if (!value) {
                return 'All Go Pages must have a slug'
              }
              return true
            }),
          ],
        }),
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: Dropdowns.GoPageAvailableLanguages,
          },
          group: 'metadata',
          validation: (rule) => rule.required().error('All Go Pages must have a language'),
        }),
        defineField({
          ...CommonWidgets.Categories,
          group: 'metadata',
        }),
        defineField({
          name: 'pageType',
          title: 'Page Type',
          type: 'string',
          options: {
            list: Dropdowns.GoPageTypes,
          },
          group: 'metadata',
          validation: (rule) => [
            rule.required().error('All Go Pages must have a Page Type'),
            rule.custom((value, context) => {
              const language = context.document?.language
              const existGoPageByLanguage =
                Dropdowns.GoPageTypes.filter(
                  (pageType) =>
                    pageType.value == value &&
                    (pageType.language == 'all' || pageType.language == language),
                ).length > 0
              if (!existGoPageByLanguage) {
                const pageType = Dropdowns.GoPageTypes.find((pageType) => pageType.value == value)
                const languageTitle = Dropdowns.GoPageAvailableLanguages.find(
                  (lang) => lang.value == pageType?.language,
                )?.title
                return `The "${pageType?.title}" Page Type is only valid for the "${languageTitle}" language.`
              }
              return true
            }),
          ],
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
