import {defineArrayMember, defineType} from 'sanity'

export const f5LinkGroup = defineType({
  name: 'f5LinkGroup',
  title: 'Link Group',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'linkGroup',
      type: 'object',
      title: 'Link Group',
      fields: [
        {
          name: 'header',
          title: 'Header',
          type: 'string',
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'f5Link',
            },
          ],
        },
      ],
      preview: {
        select: {
          title: 'header',
          links: 'links',
        },
        prepare({title, links}) {
          if (!title || !links) return {}
          const subtitle = 'Total Links: ' + links.length
          return {
            title,
            subtitle: subtitle,
          }
        },
      },
    }),
  ],
})
