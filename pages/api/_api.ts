const PlexApi = require('plex-api');

const client = new PlexApi({
    hostname: process.env.PLEX_ADDRESS,
    port: process.env.PLEX_PORT,
    token: process.env.PLEX_TOKEN,
});

export default client