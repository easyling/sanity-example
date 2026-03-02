import {CodeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5LegacyInclude = defineType({
  name: 'f5LegacyInclude',
  title: 'Legacy Include',
  icon: CodeIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'includeId',
      title: 'Legacy Include ID',
      type: 'string',
      description: 'Identifier used to locate the legacy include on the frontend.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'includeStylesheets',
      title: 'Include Legacy Stylesheets',
      type: 'boolean',
      initialValue: true,
      description: 'Should the frontend include legacy stylesheets for this include?',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
