import {ArrowDownIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const jumpNavWaypoint = defineArrayMember({
  name: 'jumpNavWaypoint',
  title: 'Jump Nav Waypoint',
  type: 'f5JumpNavWaypoint',
  icon: ArrowDownIcon,
})
