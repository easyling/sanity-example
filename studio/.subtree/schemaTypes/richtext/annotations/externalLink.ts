import {LaunchIcon} from '@sanity/icons'
import type {Rule} from 'sanity'

import ExternalLinkRenderer from '../../../components/externalLink'
import {validateExternalUrl} from '../../../utils/validators'

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
      validation: (rule: Rule) => rule.custom(validateExternalUrl),
    },
  ],
}

export default externalLink
