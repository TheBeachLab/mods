#!/bin/bash
node js/files.js > files.html
node js/load.js programs > programs/index.html
node js/load.js modules > modules/index.html
