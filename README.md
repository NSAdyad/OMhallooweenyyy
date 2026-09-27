# Halloween Interactive World

GitHub Pages-ready flat frontend for the Halloween Interactive World classroom application.

## Project structure
All runtime files are kept at the repository root. Media assets are sequentially numbered and use descriptive names. Duplicate media content is stored only once.

## Realtime backend
The realtime Node service is included as `server.js`. GitHub Pages hosts the frontend only; the realtime service must be deployed separately. Set the public backend URL in `config.js` after deployment.

## Current testing boundary
The application and realtime service have been tested locally. Rendered browser, audio playback, public deployment, and physical multi-device classroom tests remain deployment-dependent.
