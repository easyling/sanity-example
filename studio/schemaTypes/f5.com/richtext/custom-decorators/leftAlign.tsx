import type {PropsWithChildren} from 'react'
import type {BlockDecoratorDefinition} from 'sanity'

import {LeftAlignIcon} from '../../../../components/LeftAlignIcon'
import {TextAlign} from '../../../../components/TextAlignComponent'

export const LeftAlign: React.FC<PropsWithChildren> = (props) =>
  TextAlign({...props, alignment: 'left'})

export const leftAlign: BlockDecoratorDefinition = {
  title: 'Left',
  value: 'left',
  icon: LeftAlignIcon,
  component: LeftAlign,
}
