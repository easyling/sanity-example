import type {PropsWithChildren} from 'react'
import type {BlockDecoratorDefinition} from 'sanity'

import {CenterAlignIcon} from '../../../../components/CenterAlignIcon'
import {TextAlign} from '../../../../components/TextAlignComponent'

export const CenterAlign: React.FC<PropsWithChildren> = (props) =>
  TextAlign({...props, alignment: 'center'})

export const centerAlign: BlockDecoratorDefinition = {
  title: 'Center',
  value: 'center',
  icon: CenterAlignIcon,
  component: CenterAlign,
}
