import {BlockElementIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const cardBlock = defineArrayMember({
  name: 'cardBlock',
  title: 'Card Block',
  type: 'f5CardBlock',
  icon: BlockElementIcon,
})
