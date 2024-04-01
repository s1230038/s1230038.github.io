#!/bin/sh

echo 
echo '--- Execute Git hook ---------------'
echo 'For more information, see .git/hooks/pre-push'
echo
echo '*** Bash script ***'
echo '* Lint runs'
./lint.sh

echo '*** Bash completed ***'

echo
echo '--- Completed execuiting Git hook ---------------'
echo

