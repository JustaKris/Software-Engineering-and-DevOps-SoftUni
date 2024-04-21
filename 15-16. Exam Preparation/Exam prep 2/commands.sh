# Run app locally
npm install
npm run start  # localhost:8080
npm run test:unit

# Git
git init  # also make sure to .gitignore -> node_modules
git stage *
git commit -m "Repo init"
git branch "junior-dev"
git checkout "junior-dev"
git status  # check active branch
git push --set-upstream origin junior-dev

# Fix tests
npx playwright install
npm run test:ui  # Run repeatedly and fix tests to match the app (no TDD). Run a few times once done to make sure they work on repeated runs.

# Push changes to junior-dev and merge into main
git stage *
git commit -m "Fixed failing UI tests"
git push  # No commands to do the pull request so it must happen via GitHub

# Swap to master after merge
git checkout master
git pull

# GitHub Actions - start with a template for node
node -v  # Check node version to figure out what's required in the CI file

# Deploy to render and add CD step to pipeline
# Render ID (from hook in settings) -> srv-co959oi0si5c7396jqdg
# Render Key -> rnd_FTBxo7rYaRqdbL9frCXpSyFuBfsg
git commit -m "Added a deploy to Render step in pipeline.yml (CD)"
git push