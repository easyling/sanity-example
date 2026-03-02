import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const cerosProject = defineType({
  name: 'cerosProject',
  title: 'Ceros Project',
  type: 'object',
  icon: VideoIcon,
  description: 'Embed a Ceros interactive project with responsive desktop and mobile versions',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'desktop',
      title: 'Desktop Configuration',
    },
    {
      name: 'mobile',
      title: 'Mobile Configuration',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'A descriptive title for this Ceros project',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required().error('A title is required for the Ceros project'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Brief description of the Ceros project',
      type: 'text',
      group: 'basic',
    }),
    // Desktop Project Fields
    defineField({
      name: 'desktopProjectUrl',
      title: 'Desktop Project URL',
      description: 'URL for the desktop version of the Ceros project',
      type: 'url',
      group: 'desktop',
      validation: (rule) => rule.required().error('Desktop project URL is required'),
    }),
    defineField({
      name: 'desktopProjectWidth',
      title: 'Desktop Project Width',
      description: 'Width of the desktop Ceros project in pixels',
      type: 'number',
      group: 'desktop',
      validation: (rule) =>
        rule.required().min(1).error('Desktop project width must be a positive number'),
    }),
    defineField({
      name: 'desktopProjectHeight',
      title: 'Desktop Project Height',
      description: 'Height of the desktop Ceros project in pixels',
      type: 'number',
      group: 'desktop',
      validation: (rule) =>
        rule.required().min(1).error('Desktop project height must be a positive number'),
    }),
    defineField({
      name: 'desktopProjectCerosId',
      title: 'Desktop Project Ceros ID',
      description: 'Ceros project ID for the desktop version (if required for API calls)',
      type: 'string',
      group: 'desktop',
    }),
    // Mobile Project Fields
    defineField({
      name: 'mobileProjectUrl',
      title: 'Mobile Project URL',
      description: 'URL for the mobile version of the Ceros project (separate project in Ceros)',
      type: 'url',
      group: 'mobile',
      validation: (rule) => rule.required().error('Mobile project URL is required'),
    }),
    defineField({
      name: 'mobileProjectWidth',
      title: 'Mobile Project Width',
      description: 'Width of the mobile Ceros project in pixels',
      type: 'number',
      group: 'mobile',
      validation: (rule) =>
        rule.required().min(1).error('Mobile project width must be a positive number'),
    }),
    defineField({
      name: 'mobileProjectHeight',
      title: 'Mobile Project Height',
      description: 'Height of the mobile Ceros project in pixels',
      type: 'number',
      group: 'mobile',
      validation: (rule) =>
        rule.required().min(1).error('Mobile project height must be a positive number'),
    }),
    defineField({
      name: 'mobileProjectCerosId',
      title: 'Mobile Project Ceros ID',
      description: 'Ceros project ID for the mobile version (if required for API calls)',
      type: 'string',
      group: 'mobile',
    }),
    // Additional Configuration
    defineField({
      name: 'breakpoint',
      title: 'Mobile Breakpoint',
      description:
        'Screen width breakpoint for switching between mobile and desktop versions (in pixels)',
      type: 'number',
      group: 'basic',
      initialValue: 800,
      validation: (rule) =>
        rule.min(320).max(1920).error('Breakpoint must be between 320 and 1920 pixels'),
    }),
    defineField({
      name: 'isTransparent',
      title: 'Make Transparent',
      description: 'Enable transparent background for the Ceros project',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    }),
    defineField({
      name: 'embedType',
      title: 'Embed Type',
      description: 'How the Ceros project should be embedded',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Scroll', value: 'scroll'},
          {title: 'Fixed', value: 'fixed'},
          {title: 'Responsive', value: 'responsive'},
        ],
      },
      initialValue: 'scroll',
    }),
    defineField({
      name: 'isResponsive',
      title: 'Responsive Component',
      description: 'This project has a responsive component to be completed below',
      type: 'boolean',
      group: 'basic',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      desktopUrl: 'desktopProjectUrl',
      mobileUrl: 'mobileProjectUrl',
    },
    prepare: ({title, desktopUrl, mobileUrl}) => ({
      title: title || 'Ceros Project',
      subtitle: `Desktop: ${desktopUrl ? '✓' : '✗'} | Mobile: ${mobileUrl ? '✓' : '✗'}`,
    }),
  },
})
