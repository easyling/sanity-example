import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../../constants/namingConstants'

export const leaderInfo = defineType({
  name: 'leaderInfo',
  title: 'Leader Information',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: NamingConstants.EMAIL_ADDRESS,
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'isCEO',
      title: 'Is CEO',
      description: 'Check if this person is the CEO',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (value, context) => {
          // @ts-ignore
          if (value && context.parent?.isChairperson) {
            return 'Cannot be both CEO and Chairperson of the Board'
          }

          // Check if someone else is already CEO
          if (value && context.getClient) {
            const client = context.getClient({apiVersion: '2023-05-03'})
            const currentDocumentId = context.document?._id

            // Skip validation if no document ID (draft documents)
            if (!currentDocumentId) {
              return true
            }

            try {
              // Handle both draft and published document IDs
              const cleanCurrentId = currentDocumentId.replace(/^drafts\./, '')
              const query = `*[_type == "individual" && leaderInfo.isCEO == true && !(_id in [$currentId, $draftId])]{_id, firstName, lastName}`
              const existingCEOs = await client.fetch(query, {
                currentId: cleanCurrentId,
                draftId: `drafts.${cleanCurrentId}`,
              })

              if (existingCEOs && existingCEOs.length > 0) {
                const ceoName = `${existingCEOs[0].firstName} ${existingCEOs[0].lastName}`
                return `Only one person can be CEO at a time. ${ceoName} is already designated as CEO.`
              }
            } catch (error) {
              console.warn('Could not validate CEO uniqueness:', error)
            }
          }

          return true
        }),
    }),
    defineField({
      name: 'isChairperson',
      title: 'Is Chairperson of the Board',
      description: 'Check if this person is the Chairperson of the Board',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (value, context) => {
          // @ts-ignore
          if (value && context.parent?.isCEO) {
            return 'Cannot be both CEO and Chairperson of the Board'
          }

          // Check if someone else is already Chairperson
          if (value && context.getClient) {
            const client = context.getClient({apiVersion: '2023-05-03'})
            const currentDocumentId = context.document?._id

            if (!currentDocumentId) {
              return true
            }

            try {
              // Handle both draft and published document IDs
              const cleanCurrentId = currentDocumentId.replace(/^drafts\./, '')
              const query = `*[_type == "individual" && leaderInfo.isChairperson == true && !(_id in [$currentId, $draftId])]{_id, firstName, lastName}`
              const existingChairpersons = await client.fetch(query, {
                currentId: cleanCurrentId,
                draftId: `drafts.${cleanCurrentId}`,
              })

              if (existingChairpersons && existingChairpersons.length > 0) {
                const chairpersonName = `${existingChairpersons[0].firstName} ${existingChairpersons[0].lastName}`
                return `Only one person can be Chairperson of the Board at a time. ${chairpersonName} is already designated as Chairperson.`
              }
            } catch (error) {
              console.warn('Could not validate Chairperson uniqueness:', error)
            }
          }

          return true
        }),
    }),
    defineField({
      name: 'lastModification',
      title: 'Last modification',
      description: 'The last time this leader information was updated',
      type: 'datetime',
    }),
    // defineField({
    //   name: 'socialMedia',
    //   title: 'Social Media Accounts',
    //   type: 'reference',
    //   to: {type: 'socialMedia'},
    // }),
  ],
  preview: {
    select: {
      title: NamingConstants.JOB_TITLE,
      isCEO: 'isCEO',
      isChairperson: 'isChairperson',
    },
    prepare({title, isCEO, isChairperson}) {
      let roleIndicator = ''
      if (isCEO) roleIndicator = ' (CEO)'
      if (isChairperson) roleIndicator = ' (Chairperson)'

      return {
        title: (title ?? 'No job title') + roleIndicator,
      }
    },
  },
})
