import {ImageRemoveIcon} from '@sanity/icons'
import type {PropsWithChildren} from 'react'
import type {BlockDecoratorDefinition} from 'sanity'

import {Separator} from '../../../../components/SeparatorComponent'

export const SeparatorComponent: React.FC<PropsWithChildren> = (props) => Separator(props)

export const separator: BlockDecoratorDefinition = {
  title: 'Separator',
  value: 'separator',
  icon: ImageRemoveIcon,
  component: SeparatorComponent,
}
