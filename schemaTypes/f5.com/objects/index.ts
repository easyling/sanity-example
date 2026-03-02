import quote from '../richtext/additionalTypes/pullquote'
import {f5ArticleInfo} from './f5ArticleInfo'
import {f5Card} from './f5Card'
import {f5Cta} from './f5Cta'
import {f5HeroData} from './f5HeroData'
import {f5Link} from './f5Link'
import {f5LinkGroup} from './f5LinkGroup'
import {f5LogoBlock} from './f5LogoBlock'
import {f5Tile} from './f5Tile'
import {marketoData} from './marketoData'

// Note: f5Icon is a field definition (defineField), not a schema type (defineType)
// It should be imported directly where needed, not included in the schema array

export const f5objects = [
  f5ArticleInfo,
  f5HeroData,
  f5Cta,
  f5Link,
  f5LinkGroup,
  marketoData,
  quote,
  f5Card,
  f5LogoBlock,
  f5Tile,
]
