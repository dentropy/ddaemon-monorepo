#!/bin/bash
cd react && npm run build
mkdir ../backend/static/
cp -r build/* ../backend/static/

# cp -r ./react/build ./backend/static
