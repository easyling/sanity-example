import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5CerosProject = defineType({
  name: 'f5CerosProject',
  title: 'Ceros Interactive Project',
  type: 'object',
  icon: VideoIcon,
  description: 'Embed a responsive Ceros interactive project with desktop and mobile versions',
  fields: [
    defineField({
      name: 'cerosProject',
      title: 'Ceros Project',
      description: 'Select or create a Ceros project configuration',
      type: 'cerosProject',
      validation: (rule) => rule.required().error('A Ceros project configuration is required'),
    }),
    defineField({
      name: 'title',
      title: 'Block Title',
      description: 'Optional title to display above the Ceros project',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Block Description',
      description: 'Optional description to display above the Ceros project',
      type: 'text',
    }),
    defineField({
      name: 'containerWidth',
      title: 'Container Width',
      description: 'How the container should be sized',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Contained', value: 'contained'},
          {title: 'Narrow', value: 'narrow'},
        ],
      },
      initialValue: 'contained',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      description: 'How the Ceros project should be aligned',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'marginTop',
      title: 'Top Margin',
      description: 'Add margin above the Ceros project',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'marginBottom',
      title: 'Bottom Margin',
      description: 'Add margin below the Ceros project',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      projectTitle: 'cerosProject.title',
      desktopUrl: 'cerosProject.desktopProjectUrl',
      mobileUrl: 'cerosProject.mobileProjectUrl',
    },
    prepare: ({title, projectTitle, desktopUrl, mobileUrl}) => {
      const displayTitle = title || projectTitle || 'Ceros Project'
      const hasUrls = desktopUrl && mobileUrl
      return {
        title: displayTitle,
        subtitle: hasUrls ? 'Desktop & Mobile URLs configured' : 'Missing project URLs',
      }
    },
  },
})
