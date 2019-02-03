export class Score {
  score: number
  amount: number
}

export class ShowStats {
  scoreDistribution: Score[]
}

export class CoverImage {
  extraLarge: string
  medium: string
  large: string
}

export class ShowTitle {
  romaji: string
  native: string
  english: string
}

export class ShowInfo {
  id: number
  idMal: number
  title: ShowTitle
  coverImage: CoverImage
  bannerImage: string
  description: string
  format: string
  status: string
  season: string
  synonyms: string[]
  averageScore: number
  popularity: number
  episodes: number
  siteUrl: string
  locked: boolean
  stats: ShowStats
}

export class EpisodeNumber {
  start: number
  end: number
}

export class Discussion {
  author: string
  createdUtc: number
  id: string
  numComments: number
  over18: boolean
  permalink: string
  score: number
  selftext: string
  title: string
  url: string
  size: number
  showTitle: string
  episode: EpisodeNumber
  _self: boolean
  rewatch: boolean
}

export class Show {
  info: ShowInfo
  threads: Discussion[]
}

export class MALShow {
  url: string
  title: string
  title_english: string
  synopsis: string
}
