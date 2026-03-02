import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemaTypes'
import translationPlugin from '@easyling/sanity-connector'

export default defineConfig({
  name: 'default',
  title: 'Test Project',

  projectId: '356iwjnx',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    translationPlugin(),
    codeInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
