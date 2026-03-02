import {blogPost} from './blogPost'
import {callToAction} from './callToAction'
import {category} from './category'
import {chart} from './chart'
import {f5documents} from './f5.com/documents'
import {f5objects} from './f5.com/objects'
import {allF5PageBuilderObjects, allF5PageBuilders} from './f5.com/pageBuilders'
import {allF5BlockContents} from './f5.com/richtext'
import {glossaryTerm} from './glossaryTerm'
import {individual} from './individual'
import {labsArticle} from './labsArticle'
import {labsGlobalConfig} from './labsGlobalConfig'
import {accordionInfo} from './objects/accordionInfo'
import {localAlertBanner, siteWideAlertBanner} from './objects/alertBanners'
import {articleInfo} from './objects/articleInfo'
import {authorInfo} from './objects/authorInfo'
import {cerosProject} from './objects/cerosProject'
import {cta} from './objects/cta'
import {dataNugget} from './objects/dataNugget'
import {dataset} from './objects/dataset'
import {employeeInfo} from './objects/employeeInfo'
import {eventInfo} from './objects/eventInfo'
import featuredArticleSlot from './objects/featuredArticleSlot'
import {footerColumn} from './objects/footerColumn'
import {footerColumnLinks} from './objects/footerColumnLinks'
import {footerCredibility} from './objects/footerCredibility'
import {footnoteInfo} from './objects/footnoteInfo'
import {heroData} from './objects/heroData'
import {imageData} from './objects/imageData'
import {leaderInfo} from './objects/leaderInfo'
import {marketoConfig} from './objects/marketoConfig'
import {navigationItem, subnavigationSection} from './objects/navigationItem'
import {pressContactInfo} from './objects/pressContactInfo'
import {seoData} from './objects/seoData'
import {speakerInfo} from './objects/speakerInfo'
import {tabsInfo} from './objects/tabsInfo'
import {organization} from './organization'
import {labsArticleCardBlock} from './pageBuilders/blocks/labsArticleCardBlock'
import {labsDuplex} from './pageBuilders/blocks/labsDuplex'
import {labsLandingArticleCardGridBlock} from './pageBuilders/blocks/labsLandingArticleCardGridBlock'
import {LabsLandingDynamicCardBlock} from './pageBuilders/blocks/labsLandingDynamicCardBlock'
import {labsLandingPeopleBlock} from './pageBuilders/blocks/labsLandingPersonBlock'
import {labsLandingTextBlock} from './pageBuilders/blocks/labsLandingTextBlock'
import {labsTextAndArticleCardsBlock} from './pageBuilders/blocks/labsTextAndArticleCardsBlock'
import {labsLandingPageBuilder} from './pageBuilders/labsLandingPageBuilder'
import {labsHomePage} from './pages/labsHomePage'
import {labsLandingPage} from './pages/labsLandingPage'
import {pressRelease} from './pressRelease'
import {articleBlockContent} from './richtext/articleBlockContent'
import {blockContent} from './richtext/blockContent'
import {labsBlockContent} from './richtext/labsBlockContent'
import {series} from './series'
import {teaser} from './teaser'
import {webinar} from './webinar'

export const schemaTypes = [
  category,
  blockContent,
  pressRelease,
  blogPost,
  articleInfo,
  individual,
  organization,
  authorInfo,
  leaderInfo,
  pressContactInfo,
  speakerInfo,
  employeeInfo,
  callToAction,
  eventInfo,
  webinar,
  series,
  teaser,
  articleBlockContent,
  chart,
  dataset,
  glossaryTerm,
  footnoteInfo,
  cta,
  seoData,
  cerosProject,
  // Types needed by blockContent/articleBlockContent
  labsDuplex,
  accordionInfo,
  // Type needed by glossaryTerm
  heroData,
  // Types needed by cta (reference targets)
  labsArticle,
  labsLandingPage,
  labsHomePage,
  // Type needed by labsArticle
  dataNugget,
  // Types needed by labsHomePage
  featuredArticleSlot,
  labsBlockContent,
  // Type needed by labsLandingPage
  labsLandingPageBuilder,
  // Types needed by labsLandingPageBuilder
  labsLandingTextBlock,
  labsArticleCardBlock,
  labsTextAndArticleCardsBlock,
  labsLandingArticleCardGridBlock,
  labsLandingPeopleBlock,
  LabsLandingDynamicCardBlock,
]

export const labsSchemaTypes = [
  category,
  labsBlockContent,
  articleInfo,
  individual,
  organization,
  authorInfo,
  leaderInfo,
  pressContactInfo,
  speakerInfo,
  employeeInfo,
  labsArticle,
  labsHomePage,
  series,
  teaser,
  dataNugget,
  marketoConfig,
  labsGlobalConfig,
  articleBlockContent,
  chart,
  dataset,
  glossaryTerm,
  footnoteInfo,
  cta,
  seoData,
  accordionInfo,
  cerosProject,
  featuredArticleSlot,
]

export const allSchema = [
  category,
  blockContent,
  pressRelease,
  blogPost,
  articleInfo,
  individual,
  organization,
  authorInfo,
  leaderInfo,
  pressContactInfo,
  speakerInfo,
  employeeInfo,
  callToAction,
  eventInfo,
  webinar,
  series,
  teaser,
  articleBlockContent,
  chart,
  dataset,
  glossaryTerm,
  footnoteInfo,
  labsBlockContent,
  labsArticle,
  labsHomePage,
  dataNugget,
  marketoConfig,
  labsGlobalConfig,
  labsLandingPage,
  labsLandingPageBuilder,
  labsLandingTextBlock,
  labsArticleCardBlock,
  labsTextAndArticleCardsBlock,
  labsLandingArticleCardGridBlock,
  labsLandingPeopleBlock,
  LabsLandingDynamicCardBlock,
  labsDuplex,
  navigationItem,
  subnavigationSection,
  footerCredibility,
  footerColumn,
  footerColumnLinks,
  cta,
  seoData,
  imageData,
  heroData,
  accordionInfo,
  cerosProject,
  featuredArticleSlot,
]

const commonSchema = [
  authorInfo,
  callToAction,
  category,
  chart,
  dataset,
  employeeInfo,
  individual,
  leaderInfo,
  organization,
  pressContactInfo,
  speakerInfo,
  seoData,
  imageData,
  cerosProject,
  localAlertBanner,
  siteWideAlertBanner,
]

export const f5Schema = [
  ...commonSchema,
  ...f5documents,
  ...allF5BlockContents,
  ...f5objects,
  ...allF5PageBuilders,
  ...allF5PageBuilderObjects,
  tabsInfo,
]
