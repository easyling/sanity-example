import {defineField, defineType} from 'sanity'
import {PresentationIcon} from '@sanity/icons'
import {f5BrandColorList, f5BrandColors} from '../../../../utils/color'
import {CommonWidgets} from '../../../../dialogs/commonWidgets'

export const f5CarouselLinkBanner = defineType({
  name: 'f5CarouselLinkBanner',
  title: 'Banner Carousel Links',
  icon: PresentationIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'isActive',
      type: 'boolean',
      initialValue: true,
      title: 'Active',
      description: 'Toggle this to show/hide the caroursel banner',
    }),
    defineField({
      title: 'Primary Link',
      name: 'primaryLink',
      type: 'f5Link',
    }),
    defineField({
      name: 'linkGroup',
      title: 'Carousel Items',
      type: 'array',
      of: [{type: 'f5Link'}],
    }),
    {
      ...CommonWidgets.ColorPicker,
      name: 'backgroundColor',
      title: `Optional Background Color - defaults to Autumn/Warning ${f5BrandColors['autumn/warning']}`,
      initialValue: {value: f5BrandColors['autumn/warning']},
    },
    {
      ...CommonWidgets.ColorPicker,
      name: 'textColor',
      title: `Optional Text Color - defaults to Carbon ${f5BrandColors['carbon']}`,
      initialValue: {value: f5BrandColors['carbon']},
      options: {
        colorList: f5BrandColorList.filter((color: {title: string; value: string}) =>
          [f5BrandColors.carbon, f5BrandColors.white].includes(color.value),
        ),
      },
    },
  ],
  preview: {
    select: {
      links: 'linkGroup',
      active: 'isActive',
      text: 'textColor.value',
      background: 'backgroundColor.value',
    },
    prepare({
      links = [],
      active = false,
      text = f5BrandColors.carbon,
      background = f5BrandColors['autumn/warning'],
    }) {
      const subtitle = `{
        active: ${active},
        links: ${links.length},
        text: ${text},
        background: ${background}
    }`
      return {
        title: 'Carousel Link Banner',
        subtitle,
      }
    },
  },
})
