import {
  CogIcon,
  DocumentIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  ListIcon,
  WrenchIcon,
} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../constants/namingConstants'

export const labsGlobalConfig = defineType({
  name: 'labsGlobalConfig',
  title: 'Global Configurations',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'articles', title: 'Articles', icon: DocumentIcon},
    {name: 'navigation', title: 'Navigation', icon: EarthGlobeIcon},
    {name: 'footer', title: 'Footer', icon: ListIcon},
    {name: 'newsletter', title: 'Newsletter SignUp', icon: EnvelopeIcon},
    {name: 'marketo', title: 'Marketo', icon: WrenchIcon},
  ],
  fieldsets: [
    {
      name: 'newsletter',
      title: 'Newsletter Signup',
      options: {collapsible: true, collapsed: false},
    },
    {name: 'siteDefaults', title: 'Site Defaults', options: {collapsible: true, collapsed: false}},
    {
      name: 'learningObjectives',
      title: 'Learning Objectives',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'postFormSubmitContent',
      title: 'Post Form Submit Content',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'utilityNav',
      title: 'Utility Navigation',
      options: {collapsible: false, collapsed: false},
    },
    {
      name: 'footerLinksSections',
      title: 'Links Section',
      options: {collapsible: false, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'mainNavItems',
      title: 'Main Navigation Items',
      description: 'Creates main/sub navigation links on all Labs pages',
      group: 'navigation',
      type: 'array',
      of: [{type: 'navigationItem'}],
    }),
    defineField({
      name: 'utilityNavItems',
      title: 'Utility Navigation Items',
      description: 'Creates utility navigation links on all Labs pages',
      group: 'navigation',
      fieldset: 'utilityNav',
      type: 'array',
      of: [{type: 'navigationItem'}],
    }),
    defineField({
      name: 'siteLogo',
      title: 'Site Logo',
      description: 'Logo to be used throughout the site (e.g. in navigation, footer, etc.)',
      type: 'image',
      validation: (rule) => rule.required().error('The site requires a logo'),
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      description: 'Human-readable name of the site. Will appear in all title tags',
      type: 'string',
      validation: (rule) => rule.required().error('The site requires a name'),
    }),
    defineField({
      name: 'utilityNavSites',
      title: 'F5 Sites',
      description: 'List of sites displayed in the F5 Sites dropdown',
      group: 'navigation',
      fieldset: 'utilityNav',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'Text that represents this navigation item',
              type: 'string',
              validation: (rule) => rule.required().error('All navigation items need a label'),
            }),
            defineField({
              name: NamingConstants.LINK_URL,
              title: 'Link URL',
              type: 'url',
              description: 'URL that the navigation item points to',
              validation: (rule) => rule.uri({}),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerHeader',
      title: 'Footer heading text',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerCredibility',
      title: 'Footer Credibility',
      type: 'footerCredibility',
      group: 'footer',
    }),
    defineField({
      name: 'includeLogo',
      title: 'Include Logo',
      type: 'boolean',
      group: 'footer',
      fieldset: 'footerLinksSections',
    }),
    defineField({
      name: 'footerColumn',
      title: 'Columns',
      type: 'footerColumn',
      group: 'footer',
      fieldset: 'footerLinksSections',
    }),
    defineField({
      name: 'readMoreArticles',
      title: 'Read More Articles',
      description: 'Articles to be shown in all "Read More" sections across the site',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'labsArticle'},
        },
      ],
      fieldset: 'siteDefaults',
      group: 'articles',
    }),
    defineField({
      name: 'learningObjectivesHeading',
      title: 'Learning Objectives heading text',
      description: 'Heading for the Learning Objectives section of an article',
      type: 'string',
      group: 'articles',
      fieldset: 'learningObjectives',
    }),
    defineField({
      name: 'learningObjectivesDescription',
      title: 'Learning Objectives description text',
      description: "Heading for the current article's Learning Objectives, if it has any",
      type: 'text',
      group: 'articles',
      fieldset: 'learningObjectives',
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'number',
      group: 'newsletter',
      fieldset: 'newsletter',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'Headline to call attention to signup form',
      type: 'string',
      group: 'newsletter',
      fieldset: 'newsletter',
    }),
    defineField({
      name: 'privacyText',
      title: 'Privacy Text',
      type: 'labsBlockContent',
      group: 'newsletter',
      fieldset: 'newsletter',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      group: 'newsletter',
      fieldset: 'newsletter',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      description: 'Content displayed upon successful submission, next to success icon',
      type: 'string',
      fieldset: 'postFormSubmitContent',
      group: 'newsletter',
    }),
    defineField({
      name: 'successReadMoreArticlesIntro',
      title: 'Success Read More Articles Intro',
      description: 'Content displayed upon successful submission, before list of articles',
      type: 'string',
      fieldset: 'postFormSubmitContent',
      group: 'newsletter',
    }),
    defineField({
      name: 'marketoConfig',
      title: 'Marketo Configuration',
      type: 'marketoConfig',
      group: 'marketo',
    }),
  ],
  preview: {
    prepare() {
      const title = 'Newsletter SignUp'
      return {
        title,
      }
    },
  },
})
