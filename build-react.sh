#!/bin/bash
cd react && npm run build
cp -r build/ ../backend/static

# cp -r ./react/build ./backend/static
