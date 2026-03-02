import {defineField, defineType} from 'sanity'
import {InfoFilledIcon} from '@sanity/icons'
import {NamingConstants} from '../../../constants/namingConstants'
import {Lists} from '../../../dialogs/lists'
import {Dropdowns} from '../../../dialogs/dropdowns'

interface IGenerateAlertBannerArgs {
  name: string
  title: string
  isActiveTitle: string
  isActiveDescription: string
}

export const genererateAlertBannerSchema = ({
  name,
  title,
  isActiveTitle,
  isActiveDescription,
}: IGenerateAlertBannerArgs) =>
  defineType({
    name,
    title,
    type: 'object',
    icon: InfoFilledIcon,
    fields: [
      defineField({
        name: 'isActive',
        type: 'boolean',
        initialValue: false,
        title: isActiveTitle,
        description: isActiveDescription,
      }),
      defineField({
        name: 'alertType',
        title: 'Alert Type',
        type: 'string',
        options: {
          list: [
            {title: 'Info', value: 'info'},
            {title: 'Alert', value: 'alert'},
          ],
          layout: 'radio',
        },
        hidden: ({parent}) => !parent?.isActive,
      }),
      defineField({
        name: NamingConstants.PRIMARY_TEXT,
        title: 'Primary Text',
        description: 'Main alert message text',
        type: 'string',
        hidden: ({parent}) => !parent?.isActive,
      }),
      defineField({
        name: 'linkType',
        title: 'Link Type',
        type: 'string',
        initialValue: 'external',
        options: {
          list: Dropdowns.LinkTypes,
        },
        validation: (rule) =>
          rule.custom((linkType, context) => {
            const parent = context.parent as {isActive: boolean}
            if (parent?.isActive === true && !linkType) {
              return 'Please choose a link type for this navigation item'
            }
            return true
          }),
        hidden: ({parent}) => !parent?.isActive,
      }),
      defineField({
        name: NamingConstants.INTERNAL_LINK_URL,
        title: 'Link Reference',
        description:
          'Reference to a Sanity document that will generate a URL that the navigation item points to',
        type: 'reference',
        to: [{type: 'f5BlogLanding'}, ...Lists.f5ComPageDocuments],
        hidden: ({parent}) => parent?.linkType !== 'internal',
      }),
      defineField({
        name: NamingConstants.LINK_URL,
        title: 'URL',
        description:
          'URL to link to when alert is clicked. Relative URLs are supported. Leave blank if no link is required.',
        type: 'url',
        validation: (rule) => rule.uri({}),
        hidden: ({parent}) => !parent?.isActive || parent?.linkType !== 'external',
      }),
      defineField({
        name: NamingConstants.SECONDARY_TEXT,
        title: 'Secondary Text',
        description: 'Optional additional text or call-to-action button text',
        type: 'string',
        hidden: ({parent}) => !parent?.isActive,
      }),
    ],
  })
