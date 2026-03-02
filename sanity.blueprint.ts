import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'easyling-translate',
      event: {
        on: [
          'publish'
        ]
      },
      timeout: 120 // 2 minutes
    }),
  ],
})