import {BlockElementIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const tileBlock = defineArrayMember({
  name: 'tileBlock',
  title: 'Tile Block',
  type: 'f5TileBlock',
  icon: BlockElementIcon,
})
