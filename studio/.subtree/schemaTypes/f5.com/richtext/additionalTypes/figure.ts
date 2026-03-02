import {ImageIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const figure = defineArrayMember({
  name: 'figure',
  title: 'Figure',
  type: 'f5Figure',
  icon: ImageIcon,
})
