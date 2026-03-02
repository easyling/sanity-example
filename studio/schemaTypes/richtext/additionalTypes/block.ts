import {defineArrayMember} from 'sanity'

import BigNumberDecorator from '../../../components/BigNumberDecorator'
import Footnote from '../../../components/Footnote'
import MonoTextBlock from '../../../components/MonoScript'
import externalLink from '../annotations/externalLink'
import internalLink from '../annotations/internalLink'
import Superscript from '../decorators/Sup'
import SuperscriptIcon from '../decorators/Sup/Icon'

export const block = defineArrayMember({
  name: 'block',
  type: 'block',
  // Styles let you set what your user can mark up blocks with. These
  // correspond with HTML tags, but you can set any title or value
  // you want and decide how you want to deal with it where you want to
  // use your content.
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'H2', value: 'h2'},
    {title: 'H3', value: 'h3'},
    {title: 'H4', value: 'h4'},
    {title: 'H5', value: 'h5'},
    {title: 'H6', value: 'h6'},
  ],
  lists: [
    {title: 'Bullet', value: 'bullet'},
    {title: 'Numbered', value: 'number'},
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      {title: 'Strong', value: 'strong'},
      {title: 'Emphasis', value: 'em'},
      {
        title: 'Code',
        value: 'monoText',
        icon: () => '</>',
        component: MonoTextBlock,
      },
      {
        title: 'Footnote',
        value: 'footnote',
        icon: () => 'n',
        component: Footnote,
      },
      {
        title: 'Big number',
        value: 'f5LabsBigNumber',
        icon: () => '#',
        component: BigNumberDecorator,
      },
      {
        title: 'Sup',
        value: 'sup',
        icon: SuperscriptIcon,
        component: Superscript,
      },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
    annotations: [externalLink, internalLink],
  },
})

export default block
