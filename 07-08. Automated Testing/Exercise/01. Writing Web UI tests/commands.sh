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
git branch -vv

# Run tests
npx playwright test tests/ui.test.js

# Run test-ui command from package.json (after adding it manually)
npm run test-ui