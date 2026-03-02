import {CodeBlockIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

export const gitHubGist = defineArrayMember({
  name: 'f5GitHubGist',
  title: 'GitHub Gist',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'gistId',
      title: 'Gist ID',
      description: 'Example: "956f2dfce142c7924b95ec3aaaee0621"',
      type: 'string',
      validation: (rule) => rule.required().error('Gist ID is required'),
    }),
    defineField({
      name: 'gistFile',
      title: 'Gist File',
      description: 'Example: "nginx.conf"',
      type: 'string',
    }),
    defineField({
      name: 'gistLine',
      title: 'Gist Line',
      description: 'Example: "1-9"',
      type: 'string',
    }),
    defineField({
      name: 'gistHighlightLine',
      title: 'Gist Highlight Line',
      description: 'Example: "10"',
      type: 'string',
    }),
  ],
  preview: {
    select: {gistId: 'gistId'},
    prepare({gistId}) {
      return {
        title: 'GitHub Gist',
        subtitle: 'Gist ID: ' + gistId,
      }
    },
  },
})
