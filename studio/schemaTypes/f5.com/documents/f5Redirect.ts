import {RetryIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5Redirect = defineType({
  name: 'f5Redirect',
  title: 'Redirect',
  type: 'document',
  icon: RetryIcon,
  fields: [
    defineField({
      name: 'fromLocation',
      title: 'From',
      type: 'slug',
      options: {
        isUnique: async (value, context) => {
          const {document, getClient} = context
          type RedirectDocument = {
            _id: string
            fromLocation?: {
              current: string
            }
            toLocation?: string
            isPermanent?: boolean
          }

          const client = getClient({apiVersion: '2025-07-28'})
          const doc = document as RedirectDocument
          const {_id, fromLocation} = doc

          // If the `slug` is not defined, skip validation
          if (!value) {
            return true
          }

          // Build the query for slug conflicts
          let query = `*[!(_id in path('drafts.**')) && fromLocation.current == "${fromLocation?.current}"` // Check for the same fromLocation

          if (_id) {
            // Normalize the ID to handle drafts
            const normalizedId = _id.startsWith('drafts.')
              ? _id.replace('drafts.', '') // Remove "drafts." prefix
              : _id

            // Exclude the current document by its ID (to handle editing scenarios)
            query += ` && _id != "${normalizedId}"`
          }

          // Ensure `slug` collision only considers other redirects
          query += ` && _type == "f5Redirect"]`

          // Query the Sanity dataset for conflicts
          const result = await client.fetch(query)

          // Ensure the slug is unique if no conflict is found
          return result.length === 0
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'toLocation',
      title: 'To',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value, context) => {
          //@ts-ignore
          const fromLocation = context.parent?.fromLocation?.current
          if (value === fromLocation) {
            return 'The "To" value cannot be the same as the "From" value'
          }
          return true
        }),
    }),
    defineField({
      name: 'isPermanent',
      title: 'Permanent redirect',
      description: 'Turn off if this redirect will be changed or removed in the near future',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  validation: (rule) => [
    rule
      .custom(async (document, context) => {
        type RedirectDocument = {
          _id: string
          fromLocation?: {
            current: string
          }
          toLocation?: string
          isPermanent?: boolean
        }
        const doc = document as RedirectDocument
        const toLocation = doc?.toLocation
        if (doc?.fromLocation?.current === undefined || toLocation === undefined) {
          return true
        }

        const {getClient} = context
        const client = getClient({apiVersion: '2025-07-28'})
        let query = `*[_type == "f5Redirect" && fromLocation.current == "${toLocation}"]`
        const result = await client.fetch(query)
        if (result.length === 0) {
          return true
        } else {
          return `This location is the "From" location of another redirect. This redirect will chain to another redirect. It is suggested that you redirect directly to ${result[0].toLocation}`
        }
      })
      .warning(),
  ],
  preview: {
    select: {
      fromLocation: 'fromLocation.current',
      toLocation: 'toLocation',
    },
    prepare({fromLocation, toLocation}) {
      return {title: fromLocation, subtitle: toLocation}
    },
  },
})
