import {marketoData} from '../../objects/marketoData'
import {cardBlock} from './cardBlock'
import {ceros} from './ceros'
import {codeBlock} from './codeBlock'
import {columns} from './columns'
import {cta} from './cta'
import {figure} from './figure'
import {gitHubGist} from './githubGist'
import {iconText} from './iconText'
import {jumpNavWaypoint} from './jumpNavWaypoint'
import {leftRight} from './leftRight'
import {logoBlock} from './logoBlock'
import {nextSteps} from './nextSteps'
import quote from './pullquote'
import rawHtml from './rawHtml'
import {tabs} from './tabs'
import {tileBlock} from './tileBlock'
import {f5KitchenSinkTextImageRte} from './textImage'
import {video} from './video'

export const baseTypes = [cta]

export const allAdditionalTypes = [
  figure,
  f5KitchenSinkTextImageRte,
  video,
  leftRight,
  jumpNavWaypoint,
  tabs,
  nextSteps,
  columns,
  ceros,
  quote,
  cta,
  cardBlock,
  logoBlock,
  rawHtml,
  gitHubGist,
  tileBlock,
  codeBlock,
]

export const genericContentPageTypes = [
  figure,
  video,
  columns,
  cardBlock,
  nextSteps,
  jumpNavWaypoint,
  iconText,
  leftRight,
  tabs,
  ceros,
  quote,
  cta,
  rawHtml,
  marketoData,
  tileBlock,
]

export const caseStudyTypes = [
  figure,
  video,
  jumpNavWaypoint,
  tabs,
  nextSteps,
  columns,
  quote,
  cta,
  cardBlock,
]

export const glossaryTypes = [figure, video, leftRight, quote]
export const eventTypes = [figure, video, iconText, ...baseTypes]
export const accordionTypes = []
export const nextStepsTypes = []
export const tabsTypes = [figure, video, columns, iconText, quote, cardBlock, ...baseTypes]
