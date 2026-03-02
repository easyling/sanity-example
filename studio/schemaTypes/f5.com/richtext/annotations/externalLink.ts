import {LaunchIcon} from '@sanity/icons'
import type {Rule} from 'sanity'

import ExternalLinkRenderer from '../../../../components/externalLink'
import {validateExternalUrl} from '../../../../utils/validators'

const externalLink = {
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  icon: LaunchIcon,
  components: {
    annotation: ExternalLinkRenderer,
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom((url: string, context) => {
          const {document} = context

          // for legacy migrated docs, we need to relax our validation
          // we have URLs like "somepage.html"
          if (document?._id?.includes('f5-com-blog-import-')) {
            return url?.length > 0 ? true : 'Empty URL.'
          }

          return validateExternalUrl(url)
        }),
    },
  ],
}

export default externalLink
