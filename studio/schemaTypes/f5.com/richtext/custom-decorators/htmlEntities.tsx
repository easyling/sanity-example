import React from 'react'

const HighlightIcon = () => <span style={{fontWeight: 'bold'}}>&copy;</span>
export const Copyright = (props: {children: React.ReactNode}) => (
  <span>{props?.children}&copy;</span>
)
const TradeIcon = () => <span style={{fontWeight: 'bold'}}>&trade;</span>
export const TradeMark = (props: {children: React.ReactNode}) => (
  <span>{props?.children}&trade;</span>
)
const RegisteredIcon = () => <span style={{fontWeight: 'bold'}}>&reg;</span>
export const RegisterSymbol = (props: {children: React.ReactNode}) => (
  <span>{props?.children}&reg;</span>
)

export const htmlEntities = [
  {
    title: 'Copyright Symbol',
    value: 'copy',
    icon: HighlightIcon,
    component: Copyright,
  },
  {
    title: 'Trademark Symbol',
    value: 'trade',
    icon: TradeIcon,
    component: TradeMark,
  },
  {
    title: 'Registered Symbol',
    value: 'registered',
    icon: RegisteredIcon,
    component: RegisterSymbol,
  },
]
