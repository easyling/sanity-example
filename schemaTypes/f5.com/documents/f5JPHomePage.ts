import {DocumentsIcon, HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../../constants/namingConstants'
import {CommonWidgets} from '../../../dialogs/commonWidgets'
import {withDataLayer} from '../helpers/withDataLayer'
import {withSeo} from '../helpers/withSeo'

export const f5JPHomePage = withDataLayer(
  withSeo(
    defineType({
      name: 'f5JPHomePage',
      title: 'F5.com/ja_jp Homepage',
      type: 'document',
      icon: HomeIcon,
      groups: [{name: 'metadata', title: 'Metadata', icon: DocumentsIcon}],
      fields: [
        defineField({
          name: NamingConstants.BLOCK_CONTENT,
          title: 'Page Content',
          type: 'f5GenericContentPageBuilder',
        }),
        defineField({
          name: 'heroData',
          title: 'Hero Display Content',
          type: 'f5HeroData',
        }),
        defineField({
          ...CommonWidgets.ImageData,
          group: 'metadata',
        }),
      ],
      preview: {
        select: {
          title: 'heroData.title',
        },
        prepare({title}) {
          title = 'F5.com/ja_jp Homepage'
          return {
            title,
          }
        },
      },
    }),
  ),
)
