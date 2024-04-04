# Install node packages
npm install

# Install plywright for JS tests
npm install -D @playwright/test

# Run app and server (from server folder)
npm run start
node server

# Alternative ways of running frontend and backend by adding the commands to package.json
npm run start-fe
npm run start-be

# Check branches
git branch "UI-testing"
git branch -vv
git checkout "UI-testing"
git merge "main"

# Run tests
npx playwright test tests/ui.test.js

# Run test-ui command from package.json (after adding it manually)
npm run test-ui

# Render data
SERVICE_BACKEND_ID = srv-co0ngala73kc73ccfhmg
SERVICE_FRONTEND_ID = srv-co0nh7sf7o1s73c8gpi0
RENDER_TOKEN = rnd_U1iibv2N7cqAWkjhnuFKcxEoihsI