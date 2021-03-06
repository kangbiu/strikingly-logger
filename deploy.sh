#!/bin/bash

set -e

die () {
  echo >&2 "$@"
  exit 1
}

[ "$#" -eq 1 ] || die "Require environment"

environment=$1

echo "Setting environments...$environment"
if [ "$environment" == "staging" ]; then
  app_name='strikingly-logger-staging'
elif [ "$environment" == "production" ]; then
  app_name='strikingly-logger-production'
else
  die "$environment is not supported! Use staging or production"
fi

echo 'Deploying site to Heroku ...'
echo `git push -f git@heroku.com:$app_name.git HEAD:master`