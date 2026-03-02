import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'
import {CommonWidgets} from '../../dialogs/commonWidgets'
import {Dropdowns} from '../../dialogs/dropdowns'
import {Lists} from '../../dialogs/lists'

export const cta = defineType({
  name: NamingConstants.CTA,
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    // defineField({
    //   name: 'isReference',
    //   title: 'Use or create a reusable Call to Action document',
    //   type: 'boolean',
    //   initialValue: false,
    // }),
    // defineField({
    //   name: 'ctaReference',
    //   title: 'Call to Action',
    //   description: 'Choose a reusable Call to Action to use',
    //   type: 'reference',
    //   to: [{type: 'callToAction'}],
    //   hidden: ({parent}) => !parent?.isReference,
    // }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Call to Action text',
      type: 'string',
      hidden: ({parent}) => parent?.isReference,
      validation: (rule) =>
        rule
          .custom((label, context) => {
            // @ts-ignore
            // if (context.parent?.isReference) {
            //   return true
            // } else
            if (typeof label === 'undefined' || label.trim().length == 0) {
              return 'A CTA must include a label'
            } else {
              return true
            }
          })
          .error(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Optional icon to display next to the label',
      type: 'string',
      options: {
        list: Dropdowns.CtaIcons,
      },
      // hidden: ({parent}) => parent?.isReference,
    }),
    defineField({
      ...CommonWidgets.LinkAction,
      title: 'CTA Action',
      description: 'What you want the CTA to do when interacted with',
      validation: (rule) =>
        rule
          .custom((action, context) => {
            // @ts-ignore
            // if (context.parent?.isReference) {
            //   return true
            // } else
            if (typeof action === 'undefined') {
              return 'A CTA must define an action'
            } else {
              return true
            }
          })
          .error(),
      // hidden: ({parent}) => parent?.isReference,
    }),
    defineField({
      name: NamingConstants.INTERNAL_LINK_URL,
      title: 'Document to link to',
      description: 'Pick a Sanity document that this CTA will link to',
      type: 'reference',
      to: Lists.labsPageDocuments,
      validation: (rule) =>
        rule
          .custom((value, context) => {
            // @ts-ignore
            if (context.parent?.action == 'internal') {
              if (typeof value === 'undefined') {
                return 'You must define an internal document to link to'
              } else {
                return true
              }
            } else {
              return true
            }
          })
          .error(),
      hidden: ({parent}) => parent?.action !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'URL of the asset outside of Sanity that you want to link to/utilize',
      type: 'url',
      validation: (rule) =>
        rule
          .custom((value, context) => {
            // @ts-ignore
            if (context.parent?.action == 'external') {
              if (typeof value === 'undefined') {
                return 'You must define a URL to link to'
              } else {
                return true
              }
            } else {
              return true
            }
          })
          .error(),
      hidden: ({parent}) => parent?.action !== 'external' && parent?.action !== 'video',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (rule) =>
        rule
          .custom((value, context) => {
            // @ts-ignore
            if (context.parent?.action == 'file') {
              if (typeof value === 'undefined') {
                return 'You must define a file asset to link to'
              } else {
                return true
              }
            } else {
              return true
            }
          })
          .error(),
      hidden: ({parent}) => parent?.action !== 'file',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: Dropdowns.AvailableThemes,
      },
    }),
    defineField({
      name: 'isTextLink',
      title: 'Text Link only',
      description: 'Turn on to have CTA appear as text link rather than button',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
