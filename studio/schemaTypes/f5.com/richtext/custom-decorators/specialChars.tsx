import {LaunchIcon} from '@sanity/icons'
import React from 'react'
import {defineArrayMember, defineField} from 'sanity'

export const SpecialCharacterRenderer = (props: any) => (
  <span dangerouslySetInnerHTML={{__html: props?.value?.character}}></span>
)

export const specialChars = defineArrayMember({
  title: 'Special Characters',
  name: 'specialChars',
  type: 'object',
  icon: LaunchIcon,
  // @ts-ignore - inline is supported by Studio but not typed here
  options: {inline: true},
  fields: [
    defineField({
      name: 'character',
      title: 'Character',
      type: 'string',
      options: {
        list: [
          {title: 'Copyright Symbol', value: '&copy;'},
          {title: 'Trademark Symbol', value: '&trade;'},
          {title: 'Registered Symbol', value: '&reg;'},
        ],
      },
    }),
  ],
  components: {preview: SpecialCharacterRenderer},
})
