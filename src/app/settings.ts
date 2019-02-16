export enum Setting {
  RedditApp = 'redditApp',
  Analytics = 'analytics',
  ApiType = 'apiType',
  CreditShown = 'creditShown'
}

export function getDefault(setting: Setting) {
  switch (setting) {
    case Setting.RedditApp: return 'Reddit Website'
    case Setting.Analytics: return true
    case Setting.ApiType: return 'AniList'
    case Setting.CreditShown: return true
  }
}
