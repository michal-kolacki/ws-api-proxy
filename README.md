# ws-api-proxy

## Preinstallation

- yarn
- `yarn install`
- `npm install -g typescript`

## Running DEV / LOCAL

- copy `env/.env.example` to `env/.env` and fill proper data
- create empty `tmp/cookies.txt` file
- `tsc -w`
- `yarn start`
- in web browser got to `http://localhost:9090/login` to call login api and get auth cookies
