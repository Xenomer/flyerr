# Flyerr
![image](https://user-images.githubusercontent.com/9285034/190879747-282b4afd-f265-49a8-a41e-6cf8cb70f59b.png)

## Overview
A read-only catalog of your [Plex](https://plex.tv) Media Server, meant to be a "flyer" when you quickly want to show your cool legal movies to your friends without having to creating an account for them.

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
