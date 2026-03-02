import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5TileBlock = defineType({
  name: 'f5TileBlock',
  title: 'Tile(s) Block',
  type: 'object',
  icon: BlockElementIcon,
  description: 'Allows the placement of 1 or more tiles on the page',
  fields: [
    defineField({
      name: 'tiles',
      title: 'Reusable Tiles',
      description: 'Reference or create Tiles inline',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'f5Tile'}]}],
      options: {layout: 'list'},
    }),
  ],
  preview: {
    select: {
      tiles: 'tiles',
    },
    prepare({tiles}) {
      const numberOfTiles = tiles?.length ?? 0
      return {
        title: `Tile Block (${numberOfTiles} tiles)`,
      }
    },
  },
})
