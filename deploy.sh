#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# handle vue router 404 gh-pages issue
# https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/
cp index.html 404.html

# if you are deploying to a custom domain
echo 'account.avwx.rest' > CNAME

git init -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/avwx-rest/account-frontend.git main:gh-pages

cd -