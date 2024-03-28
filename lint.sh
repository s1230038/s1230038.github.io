#!/bin/bash

echo ------------
yarn markuplint 'docs/**/*.html' --fix
echo

echo ------------
npm run lint:css
echo
