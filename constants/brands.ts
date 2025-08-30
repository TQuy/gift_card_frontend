// Brand logo constants
export const BRAND_LOGOS = {
  grab: 'https://upload.wikimedia.org/wikipedia/en/1/12/Grab_%28application%29_logo.svg',
  amazon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  esprit: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Esprit.svg',
  lazada: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_%282019%29.svg',
  subway: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Subway_2016_logo.svg',
  kaspersky: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Kaspersky_logo.svg',
  netflix: 'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png',
  spotify: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg'
} as const

// Brand names mapping
export const BRAND_NAMES = {
  1: 'Grab',
  2: 'Amazon',
  3: 'Esprit',
  4: 'Subway',
  5: 'Lazada',
  6: 'Kaspersky'
} as const

// Helper function to get brand logo by name
export const getBrandLogo = (brandName: string): string => {
  const name = brandName.toLowerCase().replace(/\s+/g, '').replace(/lab$/, '')
  return BRAND_LOGOS[name as keyof typeof BRAND_LOGOS] || ''
}
