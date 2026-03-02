import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../../constants/namingConstants'
import {CommonWidgets} from '../../../../dialogs/commonWidgets'
import {withDataLayer} from '../../helpers/withDataLayer'
import {withSeo} from '../../helpers/withSeo'

export const f5BlogPost = withDataLayer(
  withSeo(
    defineType({
      name: 'f5BlogPost',
      title: 'Blog Post',
      type: 'document',
      icon: DocumentTextIcon,
      fieldsets: [{name: 'dates', title: 'Dates'}],
      fields: [
        defineField({
          ...CommonWidgets.Title,
          description: 'The title of the article, usually the headline',
          validation: (rule) => rule.required().error('All articles must include a title'),
        }),
        defineField({
          ...CommonWidgets.Slug,
          options: {
            source: NamingConstants.TITLE,
            maxLength: 96,
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'pillar',
          title: 'Pillar',
          type: 'reference',
          to: {type: 'f5BlogPillar'},
          options: {disableNew: true},
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'excerpt',
          type: 'text',
          title: 'Excerpt',
          description:
            'Small blurb that gets used in cards and lister pages. This text will not show up on the blog article',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'featuredImage',
          type: 'image',
          title: 'Featured Image',
          description:
            'Image that gets used in cards and lister pages. This image will not show up on the blog article',
        }),
        defineField({
          name: NamingConstants.PUBLISH_DATE,
          title: 'Publish date',
          type: 'datetime',
          fieldset: 'dates',
          validation: (rule) => rule.required().error('All articles must include a publish date'),
        }),
        defineField({
          name: 'lastModification',
          title: 'Last significant modification',
          description:
            'The last time this article was significantly updated (more than just a typo fix)',
          type: 'datetime',
          fieldset: 'dates',
        }),
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Article Content',
          description: 'All rich text and image content goes here',
          type: 'f5BlogBlockContent',
          validation: (rule) =>
            rule.required().error('All Blog Posts must include article information'),
        }),
        defineField({
          name: 'authors',
          title: 'Authors',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: {type: 'individual'},
              options: {filter: '_type == "individual" && "author" in roles'},
            },
          ],
          validation: (rule) =>
            rule.required().error('All articles must include at least one author'),
        }),
        defineField({
          name: 'tags',
          type: 'array',
          title: 'Tags',
          of: [{type: 'reference', to: {type: 'category'}}],
        }),
        defineField({
          type: 'array',
          name: 'relatedPosts',
          title: 'Related Blog Posts',
          description:
            'Select related blog posts. Min. 4, Max. 6. If left empty, recent posts from the same pillar will be automatically populated',
          of: [
            {
              type: 'reference',
              to: {type: 'f5BlogPost'},
              options: {disableNew: true},
            },
          ],
          validation: (Rule) => Rule.min(4).max(6),
        }),
      ],
      preview: {
        select: {
          title: NamingConstants.TITLE,
          publishDate: NamingConstants.PUBLISH_DATE,
        },
        prepare({title, publishDate}) {
          return {
            title,
            subtitle: new Date(publishDate).toLocaleDateString(),
          }
        },
      },
    }),
  ),
)
