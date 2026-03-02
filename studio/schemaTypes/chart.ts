import {BarChartIcon} from '@sanity/icons'
import {defineType} from 'sanity'

import {CommonWidgets} from '../dialogs/commonWidgets'

export const LABEL_FORMATTING_OPTIONS = [
  {title: 'Standard', value: 'standard'},
  {title: 'Commas', value: 'commas'},
  {title: 'Trailing Zeros', value: 'trailingzeros'},
  {title: 'Trailing Zeros and Commas', value: 'trailingzerosandcommas'},
]

export const chart = defineType({
  name: 'chart',
  title: 'Chart',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    {
      ...CommonWidgets.Title,
      description: 'Title of the chart',
      validation: (Rule) => Rule.required().error('A chart must include a title'),
    },
    {
      name: 'name',
      title: 'Display name',
      type: 'string',
      description: 'Display name of the chart',
    },
    {
      name: 'caption',
      type: 'string',
      description: 'Display caption of the chart',
    },
    {
      name: 'type',
      title: 'Chart Type',
      type: 'string',
      options: {
        list: [
          {title: 'Line Chart', value: 'line'},
          {title: 'Bar Chart', value: 'bar'},
          {title: 'Radar Chart', value: 'radar'},
          {title: 'Polar Area Chart', value: 'polarArea'},
          {title: 'Pie Chart', value: 'pie'},
          {title: 'Doughnut Chart', value: 'doughnut'},
          {title: 'Bubble Chart', value: 'bubble'},
          {title: 'Scatter Plot', value: 'scatter'},
          {title: 'Area Chart', value: 'area'},
          {title: 'Stacked Bar Chart', value: 'stackedbar'},
          {title: 'Grouped Bar Chart', value: 'groupedbar'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: ['horizontal', 'vertical'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'labels',
      title: 'Labels (Comma-Separated)',
      type: 'string',
      description: 'Enter labels as a comma-separated list (e.g., "January,February,March").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bgColors',
      title: 'Background Colors (Comma-Separated)',
      type: 'string',
      description:
        'Enter background colors as a comma-separated list (e.g., "#FF0000","#00FF00","#0000FF").',
    },
    {
      name: 'borderColors',
      title: 'Border Colors (Comma-Separated)',
      type: 'string',
      description:
        'Enter border colors as a comma-separated list (e.g., "#FF0000","#00FF00","#0000FF").',
    },
    {
      name: 'stackedBgColors',
      title: 'Stacked Bar Background Colors (Comma-Separated)',
      type: 'string',
      description:
        'Enter stacked background colors as a comma-separated list (e.g., "#FF5733,#33FF57,#3357FF").',
      // TODO: remove this requirement for now, migrated data doesn't always adhere to this logic
      // validation: (Rule) =>
      //   Rule.custom((value, context) => {
      //     const chartType = context.document?.type
      //     if (chartType === 'stackedbar' && !value) {
      //       return 'This field is required for a Stacked Bar Chart.'
      //     }
      //     return true
      //   }),
    },
    {
      name: 'stackedLineStyles',
      title: 'Stacked Line Styles (Comma-Separated)',
      type: 'string',
      description:
        'Enter valid values ("filled", "solid" or "dotted") for each data point, or a single value for the dataset as a comma-separated list.',
      // TODO: remove this requirement for now, migrated data doesn't always adhere to this logic
      // validation: (Rule) =>
      //   Rule.custom((value, context) => {
      //     const chartType = context.document?.type
      //     if (chartType === 'stackedbar' && !value) {
      //       return 'This field is required for a Stacked Bar Chart.'
      //     }
      //     return true
      //   }),
    },
    {
      name: 'borderWidths',
      title: 'Border Widths (Comma-Separated)',
      type: 'string',
      description: 'Enter border widths as a comma-separated list (e.g., "1,2,3").',
    },
    {
      name: 'displayYAxes',
      title: 'Display Y Axes',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'showDataTooltips',
      title: 'Show Data Tooltips',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'xLabel',
      title: 'X Axis Label',
      type: 'string',
    },
    {
      name: 'xLabelsFormatting',
      title: 'X Labels Formatting',
      type: 'string',
      options: {
        list: LABEL_FORMATTING_OPTIONS,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'yLabel',
      title: 'Y Axis Label',
      type: 'string',
    },
    {
      name: 'yLabelsFormatting',
      title: 'Y Labels Formatting',
      type: 'string',
      options: {
        list: LABEL_FORMATTING_OPTIONS,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isPercentageValues',
      title: 'Is Percentage Values',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'datasets',
      title: 'Datasets',
      type: 'array',
      of: [{type: 'dataset'}],
      validation: (Rule) => Rule.required().min(1).error('At least one dataset is required'),
    },
  ],
})

export default chart
