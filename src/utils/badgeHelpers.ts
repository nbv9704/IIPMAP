// Badge translation key mapping
export const getBadgeTranslationKey = (badge: string): string => {
  // Map Vietnamese badge text to translation keys
  const badgeMap: Record<string, string> = {
    'Xu huong': 'video.badgeTrending',
    'Moi': 'video.badgeNew',
    'Hot': 'video.badgeHot',
    'Hang ngay': 'video.badgeDaily',
    'Da luu': 'video.badgeSaved',
    'Angel AI': 'video.badgeAI',
    'Tin nhanh': 'video.badgeBreaking',
  }
  
  return badgeMap[badge] || badge
}

// Badge CSS class mapping
export const getBadgeClass = (badge: string): string => {
  // Map Vietnamese badge text to CSS classes
  const classMap: Record<string, string> = {
    'Xu huong': 'trending',
    'Moi': 'new',
    'Hot': 'hot',
    'Hang ngay': 'daily',
    'Da luu': 'saved',
    'Angel AI': 'ai',
    'Tin nhanh': 'breaking',
  }
  
  return classMap[badge] || 'default'
}
