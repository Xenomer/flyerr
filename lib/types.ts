export interface PlexApiDirectoryResponse<T> {
  MediaContainer: {
    Directory: T[]
  }
}
export interface PlexApiMetadataResponse<T> {
  MediaContainer: {
    Metadata: T[]
  }
}

export interface PlexLibrary {
  allowSync: boolean
  art: string
  composite: string
  filters: boolean
  refreshing: boolean
  thumb: string
  key: string
  type: string
  title: string
  agent: string
  scanner: string
  language: string
  uuid: string
  updatedAt: number
  createdAt: number
  scannedAt: number
  content: boolean
  directory: boolean
  contentChangedAt: number
  hidden: number
  Location: {
    id: number
    path: string
  }[]
}

export interface PlexMedia {
  ratingKey: string
  key: string
  guid: string
  studio: string
  type: string
  title: string
  originalTitle: string
  contentRating: string
  summary: string
  audienceRating: number
  year: number
  tagline: string
  thumb: string
  art: string
  duration: number
  originallyAvailableAt: string
  addedAt: number
  updatedAt: number
  audienceRatingImage: string
  chapterSource: string
  Genre: { tag: string }[]
  Director: { tag: string }[]
  Writer: { tag: string }[]
  Country: { tag: string }[]
  Role: { tag: string }[]
}

export type PlexMediaMetadata = PlexMedia & {
  librarySectionTitle: string
  librarySectionID: number
  librarySectionKey: string
  userRating: number
  viewCount: number
  lastViewedAt: number
  lastRatedAt: number
  primaryExtraKey: string
  Genre: { id: number; tag: string; filter: string }[]
  Director: { id: number; tag: string; filter: string }[]
  Writer: { id: number; tag: string; filter: string }[]
  Producer: { id: number; tag: string; filter: string }[]
  Country: { id: number; tag: string; filter: string }[]
  Guid: { id: string }[]
  Rating: { image: string; value: number; type: string }[]
  Field: { locked: boolean; name: string }[]
}
