import {defineArrayMember, defineType} from 'sanity'

export const labsLandingPageBuilder = defineType({
  name: 'labsLandingPageBuilder',
  type: 'array',
  of: [
    defineArrayMember({type: 'labsLandingTextBlock'}),
    defineArrayMember({type: 'labsArticleCardBlock'}),
    defineArrayMember({type: 'labsTextAndArticleCardsBlock'}),
    defineArrayMember({type: 'labsLandingArticleCardGridBlock'}),
    defineArrayMember({type: 'labsLandingPeopleBlock'}),
    defineArrayMember({type: 'labsLandingDynamicCardBlock'}),
  ],
})
