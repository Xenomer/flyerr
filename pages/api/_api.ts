const PlexApi: typeof PlexApiClass = require('plex-api')

declare class PlexApiClass {
  constructor(options: { hostname: string; port?: string; token?: string })
  query<T>(path: string): Promise<T>
}

const client = new PlexApi({
  hostname: process.env.PLEX_ADDRESS as string,
  port: process.env.PLEX_PORT as string,
  token: process.env.PLEX_TOKEN,
})

export default client
