import {BarChartIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const chart = defineArrayMember({
  name: 'chartReference',
  type: 'reference',
  icon: BarChartIcon,
  to: [{type: 'chart'}],
})

export default chart
