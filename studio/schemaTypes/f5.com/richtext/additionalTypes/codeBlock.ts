import {CodeBlockIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const codeBlock = defineArrayMember({
  name: 'codeBlock',
  type: 'code',
  title: 'Code Block',
  icon: CodeBlockIcon,
})
