import {ArrowUpIcon} from '@sanity/icons'
import type {PropsWithChildren} from 'react'
import type {BlockDecoratorDefinition} from 'sanity'

export const Sup: React.FC<PropsWithChildren> = (props) => <sup>{props.children}</sup>

export const superscript: BlockDecoratorDefinition = {
  title: 'Superscript',
  value: 'sup',
  icon: () => (
    <>
      F<sup style={{color: '#e4002b'}}>5</sup>
    </>
  ),
  component: Sup,
}
