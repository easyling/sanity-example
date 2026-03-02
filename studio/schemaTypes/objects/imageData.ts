import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'

export const imageData = defineType({
  name: 'imageData',
  title: 'Image Data',
  type: 'object',
  fields: [
    defineField({
      name: 'main',
      title: 'Representative Image',
      description: 'Main image that represents this page when listed alongside other pages',
      type: 'image',
    }),
    defineField({
      name: NamingConstants.SOCIAL_MEDIA_IMAGE,
      title: 'Social Media Image',
      description:
        'Deprecated. Use SEO → Open Graph Image. Existing values act as fallback only.',
      type: 'image',
      hidden: () => true,
    }),
  ],
})
