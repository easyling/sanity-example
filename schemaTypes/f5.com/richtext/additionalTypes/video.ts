import {VideoIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const video = defineArrayMember({
  name: 'video',
  title: 'Video',
  type: 'f5EmbeddedVideo',
  icon: VideoIcon,
})
