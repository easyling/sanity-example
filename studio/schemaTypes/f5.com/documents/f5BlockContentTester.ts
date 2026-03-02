import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5BlockContentTester = withDataLayer(
  withSeo(
    defineType({
      name: 'f5BlockContentTester',
      title: 'F5.com Block Content Tester',
      type: 'document',
      fields: [
        defineField({
          ...CommonWidgets.Title,
        }),
        defineField({
          name: `base${NamingConstants.BLOCK_CONTENT}`,
          title: 'Base Block Content',
          description: 'The simplest Block Content model',
          type: 'f5BaseBlockContent',
        }),
        defineField({
          name: `kitchenSink${NamingConstants.BLOCK_CONTENT}`,
          title: 'Kitchen Sink Block Content',
          description: 'Block Content model containing all currently implemented functionality',
          type: 'f5KitchenSinkBlockContent',
        }),
      ],
      preview: {
        select: {
          title: 'title',
        },
        prepare({title}) {
          return {
            title: title || 'Untitled Block Content Test',
            subtitle: 'F5.com RTE Test Document',
          }
        },
      },
    }),
  ),
)
