import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featuredArticleSlot',
  title: 'Featured Article Slot',
  type: 'object',
  fields: [
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Manual (pin an article)', value: 'manual'},
          {title: 'Auto (fill by rules)', value: 'auto'},
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingSource',
      title: 'Super Eyebrow Heading',
      description: 'Choose a predefined heading or use a custom one for this slot.',
      type: 'string',
      options: {
        list: [
          {title: 'Latest Report', value: 'LATEST_REPORT'},
          {title: 'Featured Series', value: 'FEATURED_SERIES'},
          {title: 'Latest Research', value: 'LATEST_ARTICLE'},
          {title: 'Custom heading…', value: 'custom'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'customHeading',
      title: 'Custom Heading',
      type: 'string',
      description: 'If set, this will appear as the orange super eyebrow.',
      hidden: ({parent}) => parent?.headingSource !== 'custom',
    }),
    defineField({
      name: 'manualRef',
      title: 'Pinned Article',
      type: 'reference',
      to: [{type: 'labsArticle'}],
      hidden: ({parent}) => parent?.mode !== 'manual',
    }),
    defineField({
      name: 'auto',
      title: 'Auto Rules',
      type: 'object',
      hidden: ({parent}) => parent?.mode !== 'auto',
      fields: [
        {
          name: 'source',
          title: 'Source',
          type: 'string',
          options: {
            list: [
              {title: 'Latest overall', value: 'latest'},
              {title: 'Latest by Article Type', value: 'byType'},
              {title: 'Latest in Series', value: 'bySeries'},
            ],
            layout: 'radio',
          },
          initialValue: 'latest',
        },
        {
          name: 'articleType',
          title: 'Article Type',
          type: 'string',
          hidden: ({parent}) => parent?.source !== 'byType',
        },
        {
          name: 'series',
          title: 'Series',
          type: 'reference',
          to: [{type: 'series'}],
          hidden: ({parent}) => parent?.source !== 'bySeries',
        },
        {
          name: 'exclude',
          title: 'Exclude Articles',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'labsArticle'}]}],
        },
      ],
    }),
    defineField({name: 'activeFrom', title: 'Active From', type: 'datetime'}),
    defineField({name: 'activeUntil', title: 'Active Until', type: 'datetime'}),
  ],
  preview: {
    select: {
      mode: 'mode',
      manualTitle: 'manualRef.articleInfo.title',
      seriesTitle: 'auto.series.title',
      autoSource: 'auto.source',
      autoType: 'auto.articleType',
      headingSource: 'headingSource',
      customHeading: 'customHeading',
      activeFrom: 'activeFrom',
      activeUntil: 'activeUntil',
    },
    prepare(selection) {
      const {
        mode,
        manualTitle,
        seriesTitle,
        autoSource,
        autoType,
        headingSource,
        customHeading,
        activeFrom,
        activeUntil,
      } = selection

      let title = 'Empty slot'
      let subtitleParts: string[] = []

      if (mode === 'manual') {
        title = manualTitle || 'Manual: select an article'
      } else if (mode === 'auto') {
        if (autoSource === 'latest') {
          title = 'Auto: latest article'
        } else if (autoSource === 'byType') {
          title = `Auto: latest ${autoType || 'type'}`
        } else if (autoSource === 'bySeries') {
          title = `Auto: latest in ${seriesTitle || 'series'}`
        } else {
          title = 'Auto: configure rules'
        }
      }

      if (headingSource === 'custom' && customHeading) {
        subtitleParts.push(`Eyebrow: “${customHeading}”`)
      } else if (headingSource === 'LATEST_REPORT') {
        subtitleParts.push('Eyebrow: Latest Report')
      } else if (headingSource === 'FEATURED_SERIES') {
        subtitleParts.push('Eyebrow: Featured Series')
      } else if (headingSource === 'LATEST_ARTICLE') {
        subtitleParts.push('Eyebrow: Latest Research')
      } else if (headingSource === 'articleDefault') {
        subtitleParts.push('Eyebrow: Article default')
      }

      if (activeFrom || activeUntil) {
        const fromStr = activeFrom ? new Date(activeFrom).toLocaleDateString() : 'now'
        const untilStr = activeUntil ? new Date(activeUntil).toLocaleDateString() : '∞'
        subtitleParts.push(`Active: ${fromStr} → ${untilStr}`)
      }

      return {
        title,
        subtitle: subtitleParts.join(' • '),
      }
    },
  },
})
