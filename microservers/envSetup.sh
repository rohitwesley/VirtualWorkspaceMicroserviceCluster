#!/bin/bash

# Set file paths
ENV_FILE=".env.example"
DOCKERIGNORE_FILE=".dockerignore"
GITIGNORE_FILE=".gitignore"

# Create files for Virtual Workspce Microserver Cluster
echo "Setup VirtualWorkspce Microserver Cluster"
cp -f $ENV_FILE ../.env
cp -f $GITIGNORE_FILE ../.gitignore
cp -f $DOCKERIGNORE_FILE ../.dockerignore

# Create files for nginx-microserver
echo "Setup nginx-microserver"
cp -f $ENV_FILE nginx-microserver/.env
cp -f $GITIGNORE_FILE nginx-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE nginx-microserver/.dockerignore

# Create files for redis-microserver
echo "Setup redis-microserver"
# curl -sL https://raw.githubusercontent.com/redis/redis/6.2/redis.conf -o redis-microserver/redis.conf
cp -f $ENV_FILE redis-microserver/.env
cp -f $GITIGNORE_FILE redis-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE redis-microserver/.dockerignore

# Create files for dashboard-microserver
echo "Setup dashboard-microserver"
cp -f $ENV_FILE dashboard-microserver/.env
cp -f $GITIGNORE_FILE dashboard-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE dashboard-microserver/.dockerignore

# Create files for python-microserver
echo "Setup python-microserver"
cp -f $ENV_FILE python-microserver/.env
cp -f $GITIGNORE_FILE python-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE python-microserver/.dockerignore

# Create files for unity-microserver
echo "Setup unity-microserver"
cp -f $ENV_FILE unity-microserver/.env
cp -f $GITIGNORE_FILE unity-microserver/.gitignore
cp -f $DOCKERIGNORE_FILE unity-microserver/.dockerignore

# Display success message
echo "Created $ENV_FILE, $DOCKERIGNORE_FILE, and $GITIGNORE_FILE files."
