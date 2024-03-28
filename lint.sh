#!/bin/bash

echo ------------
yarn markuplint 'doc/**/*.html' --fix
echo

echo ------------
npm run lint:css
echo
