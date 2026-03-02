import {StackCompactIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {Dropdowns} from '../../../../dialogs/dropdowns'

export const f5ColumnsBlock = defineType({
  name: 'f5ColumnsBlock',
  title: 'Columns',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'columnCount',
      title: 'Number of Columns',
      type: 'string',
      options: {
        list: Dropdowns.ColumnCounts,
      },
      initialValue: '2',
      validation: (rule) => rule.required().error('You must select a column count'),
    }),
    defineField({
      name: 'columnSpacing',
      title: 'Column Spacing',
      description: 'Choose the spacing ratio for 2-column layouts',
      type: 'string',
      options: {
        list: Dropdowns.TwoColumnSpacing,
      },
      initialValue: 'equal',
      hidden: ({parent}) => parent?.columnCount !== '2',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Section Background Color',
      description: 'Choose the background color',
      type: 'string',
      options: {
        list: [...Dropdowns.f5BackgroundColors, ...Dropdowns.f5DarkBackgroundColors],
      },
      initialValue: 'bg-white',
    }),
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'f5ColumnsBlockContent',
      validation: (rule) => rule.required().error('Column 1 must have content'),
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'f5ColumnsBlockContent',
      hidden: ({parent}) => parent?.columnCount === '1',
    }),
    defineField({
      name: 'column3',
      title: 'Column 3',
      type: 'f5ColumnsBlockContent',
      hidden: ({parent}) => parent?.columnCount === '1' || parent?.columnCount === '2',
    }),
    defineField({
      name: 'column4',
      title: 'Column 4',
      type: 'f5ColumnsBlockContent',
      hidden: ({parent}) => parent?.columnCount !== '4',
    }),
  ],
  preview: {
    select: {
      columnCount: 'columnCount',
      columnSpacing: 'columnSpacing',
      column1: 'column1',
      column2: 'column2',
    },
    prepare({columnCount, columnSpacing, column1, column2}) {
      const count = columnCount || '2'
      let title = `${count} Column${count !== '1' ? 's' : ''}`

      if (count === '2' && columnSpacing) {
        const spacingLabel =
          Dropdowns.TwoColumnSpacing.find((s) => s.value === columnSpacing)?.title || columnSpacing
        title += ` (${spacingLabel})`
      }

      let subtitle = ''
      if (column1 && column1.length > 0) {
        const firstBlock = column1.find((block: any) => block._type === 'block')
        if (firstBlock && firstBlock.children) {
          const text = firstBlock.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
            .substring(0, 50)
          subtitle = text ? `${text}...` : 'Column content'
        }
      }

      return {
        title,
        subtitle: subtitle || 'Columns block',
      }
    },
  },
})
