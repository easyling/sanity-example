import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerColumn = defineType({
  name: 'footerColumn',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'column',
          type: 'object',
          title: 'Links',
          fields: [
            {
              name: 'header',
              title: 'Header',
              type: 'string',
            },
            {
              name: 'footerColumnLinks',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'footerColumnLinks',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'header',
              footerColumnLinks: 'footerColumnLinks',
            },
            prepare({title, footerColumnLinks}) {
              const subtitle = 'Total Links: ' + footerColumnLinks.length
              return {
                title,
                subtitle: subtitle,
              }
            },
          },
        }),
      ],
    }),
  ],
})
