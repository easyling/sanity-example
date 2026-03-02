import {
  f5BrandIcons,
  f5FilledIcons,
  f5ProductIcons,
  icons,
} from '../../../libs/web-marketing-component-library'
import {createElement} from 'react'
import {defineField} from 'sanity'

export const f5Icon = defineField({
  title: 'Icon',
  name: 'f5Icon',
  type: 'iconPicker',
  options: {
    storeSvg: true,
    outputFormat: 'react',
    configurations: [
      {
        title: 'F5 Basic Icons',
        provider: 'f5',
        icons: () => {
          const iconList = Object.entries(icons).map(([name, Component]: [string, any]) => {
            return {
              name,
              component: () => createElement(Component, {width: 24, height: 24}),
              tags: [name, 'f5', 'basic'],
            }
          })
          return iconList
        },
      },
      {
        title: 'F5 Brand Icons',
        provider: 'f5Brand',
        icons: () => {
          const iconList = Object.entries(f5BrandIcons).map(([name, Component]: [string, any]) => {
            return {
              name,
              component: () => createElement(Component, {width: 24, height: 24}),
              tags: [name, 'f5', 'brand'],
            }
          })
          return iconList
        },
      },
      {
        title: 'F5 Filled Icons',
        provider: 'f5Filled',
        icons: () => {
          const iconList = Object.entries(f5FilledIcons).map(([name, Component]: [string, any]) => {
            return {
              name,
              component: () => createElement(Component, {width: 24, height: 24}),
              tags: [name, 'f5', 'filled'],
            }
          })
          return iconList
        },
      },
      {
        title: 'F5 Product Icons',
        provider: 'f5Product',
        icons: () => {
          const iconList = Object.entries(f5ProductIcons).map(
            ([name, Component]: [string, any]) => {
              return {
                name,
                component: () => createElement(Component, {width: 24, height: 24}),
                tags: [name, 'f5', 'brand'],
              }
            },
          )
          return iconList
        },
      },
    ],
  },
})
