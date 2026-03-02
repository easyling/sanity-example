import {ChevronDownIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const accordion = defineArrayMember({
  name: 'accordion',
  title: 'Accordion',
  type: 'accordionInfo',
  icon: ChevronDownIcon,
})

export default accordion
