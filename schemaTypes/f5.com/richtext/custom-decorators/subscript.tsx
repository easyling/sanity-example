import {ArrowDownIcon} from '@sanity/icons'
import type {PropsWithChildren} from 'react'
import type {BlockDecoratorDefinition} from 'sanity'

export const Sub: React.FC<PropsWithChildren> = (props) => <sub>{props.children}</sub>

export const subscript: BlockDecoratorDefinition = {
  title: 'Subscript',
  value: 'sub',
  icon: () => (
    <>
      F<sub style={{color: '#e4002b'}}>5</sub>
    </>
  ),
  component: Sub,
}
