#!/bin/bash

echo ------------
yarn markuplint 'src/**/*.html' --fix
echo

echo ------------
npm run lint:css
echo
