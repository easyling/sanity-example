import type {PropsWithChildren} from 'react'
import type {BlockDecoratorDefinition} from 'sanity'

import RightAlignIcon from '../../../../components/RightAlignIcon'
import {TextAlign} from '../../../../components/TextAlignComponent'

export const RightAlign: React.FC<PropsWithChildren> = (props) =>
  TextAlign({...props, alignment: 'right'})

export const rightAlign: BlockDecoratorDefinition = {
  title: 'Right',
  value: 'right',
  icon: RightAlignIcon,
  component: RightAlign,
}
