import {defineArrayMember} from 'sanity'
import {extendBlockMarksWithDNT} from '@easyling/sanity-connector'

import {baseAnnotations} from '../annotations'
import {baseDecorations} from '../custom-decorators'
import {baseLists} from '../lists'
import {baseStyles} from '../styles'

export const glossaryBlock = defineArrayMember({
  name: 'block',
  type: 'block',
  // Styles let you set what your user can mark up blocks with. These
  // correspond with HTML tags, but you can set any title or value
  // you want and decide how you want to deal with it where you want to
  // use your content.
  styles: [...baseStyles],
  lists: [...baseLists],
  // Marks let you mark up inline text in the block editor.
  marks: extendBlockMarksWithDNT({
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [...baseDecorations],
    annotations: [...baseAnnotations],
  }),
})
