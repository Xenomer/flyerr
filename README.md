## Usage

### Running the production version
```bash
npm run build
npm start
```
### Running the development version

```bash
npm run dev
```

## Environment variables
 key          | example               | description                                                      |
--------------|-----------------------|------------------------------------------------------------------|
 PLEX_TOKEN   | `DaJcJv93D5dugXu1241` | your plex token                                                  |
 PLEX_ADDRESS | `192.168.2.5`         | address to the plex server                                       |
 PLEX_PORT    | `32400`               | port of the plex server                                          |
 LIBRARIES    | `movies,tv shows`     | comma-separated list of library titles to include, in lower case |
 TITLE        | `My plex catalog`     | custom title shown in the top                                    |