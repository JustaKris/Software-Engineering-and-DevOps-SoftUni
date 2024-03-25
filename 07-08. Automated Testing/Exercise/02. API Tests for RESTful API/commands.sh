# Initialize node project in current folder 
npm init -y

# Install dependencies
npm install express
npm install body-parser

# Install developer dependencies
npm install -D mocha
npm install -D chai  # Latest version did not work so had to set to 4.2.0 in the package.json file
npm install -D chai-http

# Run server
node server.js  # Use Postman to test and explore -> http://localhost:3000

# Run tests
npx mocha api.test.js
npm run test-api  # This is the above command set up in the package.json. Server as an alternative to the above.