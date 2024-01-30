#!/bin/bash

# Set file paths
ENV_FILE=".env.example"
DOCKERIGNORE_FILE=".dockerignore"
GITIGNORE_FILE=".gitignore"

# Make sure we're in the directory that the script is in
pushd $(dirname "$0")

# Create files for redis-microserver
echo "Setup redis-microserver"
# curl -sL https://raw.githubusercontent.com/redis/redis/6.2/redis.conf -o redis-microserver/redis.conf
cp -f $ENV_FILE redis-microserver/.env
cp -f $GITIGNORE_FILE redis-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE redis-microserver/.dockerignore

# Create files for python-microserver
echo "Setup python-microserver"
cp -f $ENV_FILE python-microserver/.env
cp -f $GITIGNORE_FILE python-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE python-microserver/.dockerignore

# Create files for ffmpeg-microserver
echo "Setup ffmpeg-microserver"
cp -f $ENV_FILE ffmpeg-microserver/.env
cp -f $GITIGNORE_FILE ffmpeg-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE ffmpeg-microserver/.dockerignore

# Create files for dashboard-microserver
echo "Setup dashboard-microserver"
cp -f $ENV_FILE dashboard-microserver/.env
cp -f $GITIGNORE_FILE dashboard-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE dashboard-microserver/.dockerignore

# Display success message
echo "Created $ENV_FILE, $DOCKERIGNORE_FILE, and $GITIGNORE_FILE files."

popd