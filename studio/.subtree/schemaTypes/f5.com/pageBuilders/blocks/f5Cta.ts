import {MicrophoneIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {Dropdowns} from '../../../../dialogs/dropdowns'

export const f5CtaBlock = defineType({
  name: 'f5CtaBlock',
  title: 'CTA',
  type: 'object',
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: 'useContainer',
      title: 'Use Container for alignment',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ctaAlignment',
      title: 'CTA Alignment',
      type: 'string',
      options: {
        list: Dropdowns.ContentAlignmentOptions,
      },
      initialValue: 'text-left',
      hidden: ({parent}) => parent?.useContainer === false,
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'f5Cta',
    }),
  ],
  preview: {
    select: {label: 'cta.label'},
    prepare: ({label}) => ({
      title: label,
    }),
  },
})
