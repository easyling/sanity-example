/**
 * F5 Brand Colors - Color value constants
 */
export const f5BrandColors: Record<string, string> = {
  carbon: '#1a1a1a',
  white: '#ffffff',
  'autumn/warning': '#ff6b35',
  brand: '#0071ce',
  ash: '#f5f5f5',
  // Add more brand colors as needed
}

/**
 * F5 Brand Color List - Array format for dropdowns and color pickers
 * Each item has a title and value property
 */
export const f5BrandColorList: Array<{title: string; value: string}> = [
  {title: 'Carbon', value: f5BrandColors.carbon},
  {title: 'White', value: f5BrandColors.white},
  {title: 'Autumn/Warning', value: f5BrandColors['autumn/warning']},
  {title: 'Brand Blue', value: f5BrandColors.brand},
  {title: 'Ash', value: f5BrandColors.ash},
  // Add more colors as needed
]

