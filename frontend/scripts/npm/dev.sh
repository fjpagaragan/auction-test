#!/bin/bash
set -ex

concurrently \
  "npx tailwindcss -i ./src/styles/tailwind_input.css -o ./src/styles/style.css --watch" \
  "npx next dev" \
  -n Tailwind,NextApp \
  -c cyan.bold,green.bold
