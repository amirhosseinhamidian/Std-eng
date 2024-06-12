#!/bin/sh

# Start Nginx in the background
nginx -g 'daemon off;' &

# Start the npm application
npm start