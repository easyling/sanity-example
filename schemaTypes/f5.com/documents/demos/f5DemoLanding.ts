import {defineField} from 'sanity'

import {withDataLayer} from '../../helpers/withDataLayer'
import {withSeo} from '../../helpers/withSeo'
import {NamingConstants} from '../../../../constants/namingConstants'

export const f5DemoLanding = withDataLayer(
  withSeo({
    title: 'Demo Center Landing Page',
    type: 'document',
    name: 'f5DemoLanding',
    fields: [
      defineField({
        type: 'array',
        name: 'featuredDemos',
        title: 'Featured Demos',
        description:
          'Select 3-4 demos to be featured on the demo center landing page. If left empty, 3 most recent demos will be automatically populated',
        of: [
          {
            type: 'reference',
            to: {type: 'f5Demo'},
            options: {disableNew: true},
          },
        ],
        validation: (Rule) => Rule.min(3).max(4),
      }),
      defineField({
        name: 'hero',
        title: 'Hero',
        type: 'f5HeroData',
      }),
      defineField({
        name: NamingConstants.BLOCK_CONTENT,
        title: 'Rich Text Content',
        description:
          'Use this to create content that appears between the Featured Demos and Search Results',
        type: 'f5GenericContentPageText',
      }),
      defineField({
        name: 'resources',
        title: 'Next Steps / Resources',
        type: 'f5NextSteps',
      }),
    ],
    preview: {
      prepare: () => ({
        title: 'Demo Center Landing Page',
      }),
    },
  }),
)
