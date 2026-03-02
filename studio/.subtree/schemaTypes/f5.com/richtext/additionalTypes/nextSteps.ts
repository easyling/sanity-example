import {ArrowRightIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const nextSteps = defineArrayMember({
  name: 'nextSteps',
  title: 'Next Steps',
  type: 'f5NextSteps',
  icon: ArrowRightIcon,
})
