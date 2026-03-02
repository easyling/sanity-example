import {defineArrayMember} from 'sanity'

export const figure = defineArrayMember({
  title: 'Figure',
  type: 'image',
  options: {hotspot: true},
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility',
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'Alignment',
      description: 'Choose how image is aligned in article',
      options: {
        list: [
          {title: 'Full width', value: 'img-full'},
          {title: 'Left align, one third width', value: 'pull-left one-third'},
          {title: 'Right align, one third width', value: 'pull-right one-third'},
          {title: 'Left align, half width', value: 'pull-left half'},
          {title: 'Right align, half width', value: 'pull-right half'},
          {title: 'Left align, two thirds width', value: 'pull-left two-third'},
          {title: 'Right align, two thirds width', value: 'pull-right two-third'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'img-full',
    },
  ],
})

export default figure
