import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const f5EmbeddedVideo = defineType({
  name: 'f5EmbeddedVideo',
  title: 'Embedded Video',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'URL',
      description: 'YouTube video URL',
      type: 'string',
      validation: (rule) =>
        rule.custom((videoUrl) => {
          if (typeof videoUrl === 'undefined') {
            return 'You must provide a YouTube URL'
          }
          const youTubeRegex =
            /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/
          return youTubeRegex.test(videoUrl) || 'The provided URL is not a valid YouTube URL'
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Text to be displayed alongside the video',
      type: 'string',
    }),
  ],
  preview: {
    select: {videoUrl: 'videoUrl', caption: 'caption'},
    prepare: ({videoUrl, caption}) => ({
      title: caption,
      subtitle: videoUrl,
    }),
  },
})
