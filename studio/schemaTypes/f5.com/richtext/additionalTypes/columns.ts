import {StackCompactIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const columns = defineArrayMember({
  name: 'columns',
  title: 'Columns',
  type: 'f5ColumnsBlock',
  icon: StackCompactIcon,
})
