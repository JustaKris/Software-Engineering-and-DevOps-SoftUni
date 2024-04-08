# Clone existing repository
git clone url
# Pull repository
git pull
# Initialize repository
git init
# View repo info
git status
# Add files to repo
git add .
# Commit changes to repo
git commit -m "Repo init"
# Push changes to master
git push origin master
# Create branch
git branch "new branch"
# Switch branch
git switch "master"
git checkout "new branch"
# Create and checkout new branch
git checkout -b "newer branch"
# List all branches
git list --all
git branch -a
# List branch with latest commit
git branch --verbose
git branch -vv
# List all local branches
git branch
# Merge branch into the active one
git merge "master"
# Delete branch
git branch -d "newer branch"
# Delete remote branch
git push origin -d "new branch"
# Include only specific commits
git cherry-pick "new branch"