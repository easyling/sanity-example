import {NamingConstants} from '../constants/namingConstants'
import {Dropdowns} from './dropdowns'

export const CommonWidgets = {
  ImageData: {
    name: NamingConstants.IMAGE_DATA,
    title: 'Image Data',
    type: 'image',
  },
  Title: {
    name: NamingConstants.TITLE,
    title: 'Title',
    type: 'string',
  },
  Slug: {
    name: NamingConstants.SLUG,
    title: 'Slug',
    type: 'slug',
  },
  Description: {
    name: NamingConstants.DESCRIPTION,
    title: 'Description',
    type: 'text',
  },
  Image: {
    name: NamingConstants.IMAGE,
    title: 'Image',
    type: 'image',
  },
  Categories: {
    name: NamingConstants.TAGS,
    title: 'Categories',
    type: 'array',
    of: [{type: 'reference', to: {type: 'category'}}],
  },
  MetaRobots: {
    name: 'robots',
    title: 'Meta Robots',
    description: 'Determines whether search engines will index this page and follow links',
    type: 'string',
    options: {
      list: Dropdowns.MetaRobots,
    },
  },
  LinkAction: {
    name: 'action',
    title: 'Link Action',
    description: 'What you want the link to do when interacted with',
    type: 'string',
    options: {
      list: Dropdowns.CtaActions,
    },
  },
  ExternalLinkUrl: {
    name: 'externalUrl',
    title: 'External URL',
    description: 'URL of the asset outside of Sanity that you want to link to/utilize',
    type: 'url',
    validation: (rule: any) => rule.uri({}),
  },
  FileLink: {
    name: 'file',
    title: 'File',
    description: 'File asset to link to',
    type: 'file',
  },
  ColorPicker: {
    title: 'Color',
    type: 'object',
    fields: [
      {
        name: 'value',
        title: 'Color Value',
        type: 'string',
      },
    ],
    options: {
      colorList: [] as Array<{title: string; value: string}>,
    },
  },
  SeoData: {
    name: 'seoData',
    title: 'SEO Data',
    type: 'seoData',
  },
  SocialMediaImage: {
    name: NamingConstants.SOCIAL_MEDIA_IMAGE,
    title: 'Social Media Image',
    description: 'Image to use when sharing on social media',
    type: 'image',
  },
}