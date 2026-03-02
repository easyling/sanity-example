import {defineField, defineType} from 'sanity'

export const footnoteInfo = defineType({
  title: 'Footnote Info',
  name: 'footnoteInfo',
  type: 'object',
  fields: [
    defineField({
      title: 'Footnote',
      name: 'footnote',
      type: 'articleBlockContent',
    }),
  ],
  preview: {
    select: {
      footnote: 'footnote',
    },
    prepare({footnote}) {
      if (footnote.length < 1 && footnote[0].children.length < 1) {
        return {
          title: 'Footnote',
        }
      }
      return {
        title: footnote[0].children[0].text,
      }
    },
  },
})
