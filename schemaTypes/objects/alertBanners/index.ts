import {genererateAlertBannerSchema} from './factory'

export const siteWideAlertBanner = genererateAlertBannerSchema({
  name: 'sitewideAlertBanner',
  title: 'Site Wide Alert Banner',
  isActiveTitle: 'Add Sitewide Alert Banner',
  isActiveDescription:
    'Sitewide Alert will appear on ALL pages of the site. Exceptions: Any pages that have individual Alert Banners will still display the individual alert instead of the Sitewide Alert.',
})

export const localAlertBanner = genererateAlertBannerSchema({
  name: 'localAlertBanner',
  title: 'Local Alert Banner',
  isActiveTitle: 'Add Alert Banner to this Page',
  isActiveDescription:
    'This alert banner will appear on this page above the hero section. It will take precedence over a Site Wide Alert Banner',
})
