export enum Setting {
  RedditApp = 'redditApp',
  Analytics = 'analytics',
  ApiType = 'apiType'
}

export function getDefault(setting: Setting) {
  switch (setting) {
    case Setting.RedditApp: return 'Reddit Website'
    case Setting.Analytics: return true
    case Setting.ApiType: return 'AniList'
  }
}
