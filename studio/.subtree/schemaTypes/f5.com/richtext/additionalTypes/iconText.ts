import {UlistIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const iconText = defineArrayMember({
  name: 'iconText',
  title: 'Icon + Text',
  type: 'f5IconText',
  icon: UlistIcon,
})
