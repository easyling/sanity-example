import {centerAlign} from './centerAlign'
import {htmlEntities} from './htmlEntities'
import {leftAlign} from './leftAlign'
import {rightAlign} from './rightAlign'
import {separator} from './separator'
import {subscript} from './subscript'
import {superscript} from './superscript'

export const baseDecorations = [
  {title: 'Strong', value: 'strong'},
  {title: 'Emphasis', value: 'em'},
  {title: 'Code', value: 'code'},
  separator,
  superscript,
  subscript,
  leftAlign,
  centerAlign,
  rightAlign,
  ...htmlEntities,
]
