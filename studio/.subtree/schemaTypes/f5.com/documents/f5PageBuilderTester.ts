import {defineField, defineType} from 'sanity'

import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5PageBuilderTester = withDataLayer(
  withSeo(
    defineType({
      name: 'f5PageBuilderTester',
      title: 'F5.com PageBuilder Tester',
      type: 'document',
      fields: [
        defineField(CommonWidgets.Title),
        defineField(CommonWidgets.Slug),
        defineField({
          name: `kitchenSinkPageBuilder`,
          title: 'Kitchen Sink PageBuilder',
          description: 'PageBuilder containing all currently implemented functionality',
          type: 'f5KitchenSinkPageBuilder',
        }),
      ],
    }),
  ),
)
