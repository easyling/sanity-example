import {ImageIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const logoBlock = defineArrayMember({
  name: 'logoBlock',
  title: 'Logo Block',
  type: 'f5LogoBlock',
  icon: ImageIcon,
})
