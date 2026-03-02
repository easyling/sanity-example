import {EarthGlobeIcon, EditIcon, MicrophoneIcon, UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {NamingConstants} from '../constants/namingConstants'
import {CommonWidgets} from '../dialogs/commonWidgets'
import {Dropdowns} from '../dialogs/dropdowns'
import {htmlEntities} from './f5.com/richtext/custom-decorators/htmlEntities'

export const individual = defineType({
    name: 'individual',
    title: 'Person',
    type: 'document',
    icon: UserIcon,
    groups: [
      {name: 'basic', title: 'Basic', icon: EarthGlobeIcon, default: true},
      {name: 'author', title: 'Author', icon: EditIcon},
      {name: 'speaker', title: 'Speaker', icon: MicrophoneIcon},
      {name: 'leadership', title: 'Leader', icon: UserIcon},
      {name: 'pressContact', title: 'Press Contact'},
    ],
    fieldsets: [
      {name: 'name', title: 'Name', options: {collapsible: true, collapsed: false, columns: 3}},
    ],
    fields: [
      defineField({
        name: 'prefix',
        title: 'Prefix',
        description: 'e.g., Ms, Mr, Dr',
        type: 'string',
        fieldset: 'name',
        group: 'basic',
      }),
      defineField({
        name: 'firstName',
        title: 'First/Given Name',
        type: 'string',
        fieldset: 'name',
        group: 'basic',
        validation: (rule) => rule.required().error('First name is required'),
      }),
      defineField({
        name: 'middleInitial',
        title: 'Middle Initial',
        type: 'string',
        fieldset: 'name',
        group: 'basic',
        validation: (rule) => rule.max(3).error('Middle initial should be 3 characters or less'),
      }),
      defineField({
        name: 'lastName',
        title: 'Last/Family Name',
        type: 'string',
        fieldset: 'name',
        group: 'basic',
        validation: (rule) => rule.required().error('All individuals must have a last name'),
      }),
      defineField({
        name: 'suffix',
        title: 'Suffix',
        description: 'e.g., Jr, Sr, PhD',
        type: 'string',
        fieldset: 'name',
        group: 'basic',
      }),
      defineField({
        name: 'nameIsReversed',
        title: 'Reverse Name Order',
        description:
          "Check this box if the individual's last/family name should be displayed before the first/given name",
        type: 'boolean',
        fieldset: 'name',
        group: 'basic',
      }),
      defineField({
        name: 'slug',
        title: 'URL Slug',
        type: 'slug',
        description: 'URL-friendly version of the name',
        validation: (rule) =>
          rule.required().custom((slug) => {
            if (!slug?.current) return 'Slug is required'
            const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
            if (!pattern.test(slug.current)) {
              return 'Slug can only contain lowercase letters, numbers, and hyphens. No slashes or special characters allowed.'
            }
            return true
          }),
        options: {
          source: (doc) => {
            const prefix = doc.prefix ? doc.prefix + ' ' : ''
            const firstName = doc.firstName || ''
            const middleInitial = doc.middleInitial ? ' ' + doc.middleInitial : ''
            const lastName = doc.lastName || ''
            const suffix = doc.suffix ? ' ' + doc.suffix : ''

            const fullName =
              doc.nameIsReversed || false
                ? lastName + ', ' + firstName + middleInitial
                : firstName + middleInitial + ' ' + lastName

            return prefix + fullName + suffix
          },
          maxLength: 96,
          slugify: (input) =>
            input
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '') // This removes the problematic / and other chars
              .replace(/\-{2,}/g, '-')
              .replace(/^-|-$/g, ''),
        },
        group: 'basic',
      }),
      defineField({
        ...CommonWidgets.Image,
        name: 'gridImage',
        title: 'Grid Image',
        description: 'Image for the leadership landing page grid view',
        group: 'basic',
        options: {
          hotspot: true,
        },
        hidden: ({document}) =>
          !document?.roles ||
          (Array.isArray(document?.roles) &&
            !document.roles.some((role: string) => ['leadership', 'board'].includes(role))),
      }),
      defineField({
        ...CommonWidgets.Image,
        title: 'Headshot',
        description: 'Image of the individual used on their individual profile page',
        group: 'basic',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'jobTitle',
        title: 'Job Title',
        type: 'string',
        group: 'basic',
        validation: (rule) =>
          rule.custom((value, context) => {
            const roles = context.document?.roles as string[] | undefined
            const hasLeadershipRole = roles?.some((role: string) =>
              ['leadership', 'board'].includes(role),
            )

            if (hasLeadershipRole && !value) {
              return 'Job title is required for leadership and board member roles'
            }
            return true
          }),
      }),
      defineField({
        name: 'companies',
        title: 'Companies',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: {type: 'organization'},
          },
        ],
        group: 'basic',
      }),
      defineField({
        name: NamingConstants.BIOGRAPHY,
        title: 'Biography',
        type: 'array',
        of: [
          {
            type: 'block',
            marks: {
              decorators: htmlEntities,
            },
          },
        ],
        group: 'basic',
        validation: (rule) =>
          rule.custom((value, context) => {
            const roles = context.document?.roles as string[] | undefined
            const hasLeadershipRole = roles?.some((role: string) =>
              ['leadership', 'board'].includes(role),
            )

            if (hasLeadershipRole && (!value || value.length === 0)) {
              return 'Biography is required for leadership and board member roles'
            }
            return true
          }),
      }),
      defineField({
        name: 'lastModification',
        title: 'Last modification',
        description: 'The last time this individual was updated',
        type: 'datetime',
        group: 'basic',
      }),
      defineField({
        name: 'roles',
        title: 'Roles',
        description: 'Roles the individual plays in the organization',
        type: 'array',
        of: [
          {
            type: 'string',
            options: {
              list: Dropdowns.IndividualRoles,
            },
          },
        ],
        group: ['author', 'speaker', 'leadership', 'pressContact'],
      }),
      defineField({
        name: 'authorInfo',
        title: 'Author Info',
        description: 'Information about the individual as an author',
        type: 'authorInfo',
        group: 'author',
        hidden: ({document}) =>
          !document?.roles ||
          (Array.isArray(document?.roles) && !document.roles.includes('author')),
      }),
      defineField({
        name: 'speakerInfo',
        title: 'Speaker Info',
        description: 'Information about the individual as a speaker',
        type: 'speakerInfo',
        group: 'speaker',
        hidden: ({document}) =>
          !document?.roles ||
          (Array.isArray(document?.roles) && !document.roles.includes('speaker')),
      }),
      defineField({
        name: 'leaderInfo',
        title: 'Leader Info',
        description: 'Information about the individual as a leader',
        type: 'leaderInfo',
        group: 'leadership',
        hidden: ({document}) =>
          !document?.roles ||
          (Array.isArray(document?.roles) &&
            !document.roles.some((role: string) => ['leadership', 'board'].includes(role))),
      }),
      defineField({
        name: 'pressContactInfo',
        title: 'Press Contact Info',
        description: 'Information about the individual as a press contact',
        type: 'pressContactInfo',
        group: 'pressContact',
        hidden: ({document}) =>
          !document?.roles ||
          (Array.isArray(document?.roles) && !document.roles.includes('pressContact')),
      }),
    ],
    preview: {
      select: {
        prefix: 'prefix',
        firstName: 'firstName',
        middleInitial: 'middleInitial',
        lastName: 'lastName',
        suffix: 'suffix',
        nameIsReversed: 'nameIsReversed',
        media: 'image',
        roles: 'roles',
      },
      prepare({prefix, firstName, middleInitial, lastName, suffix, nameIsReversed, media, roles}) {
        const prefixPart = prefix ? prefix + ' ' : ''
        const middlePart = middleInitial ? ' ' + middleInitial : ''
        const suffixPart = suffix ? ' ' + suffix : ''

        const fullName = nameIsReversed
          ? `${lastName}, ${firstName}${middlePart}`
          : `${firstName}${middlePart} ${lastName}`

        const title = prefixPart + fullName + suffixPart

        let subtitleBuilder: string = ''
        if (roles?.includes('author')) {
          subtitleBuilder += 'Author'
        }
        if (roles?.includes('speaker')) {
          if (subtitleBuilder.length > 0) {
            subtitleBuilder += ', '
          }
          subtitleBuilder += 'Speaker'
        }
        if (roles?.includes('leadership')) {
          if (subtitleBuilder.length > 0) {
            subtitleBuilder += ', '
          }
          subtitleBuilder += 'Leadership'
        }
        if (roles?.includes('board')) {
          if (subtitleBuilder.length > 0) {
            subtitleBuilder += ', '
          }
          subtitleBuilder += 'Board Member'
        }
        if (roles?.includes('pressContact')) {
          if (subtitleBuilder.length > 0) {
            subtitleBuilder += ', '
          }
          subtitleBuilder += 'Press Contact'
        }
        if (subtitleBuilder.length === 0) {
          subtitleBuilder = 'No roles set'
        }
        return {
          title,
          subtitle: subtitleBuilder,
          media: media,
        }
      },
    },
})
