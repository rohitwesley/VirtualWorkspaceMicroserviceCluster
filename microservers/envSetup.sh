#!/bin/bash

# Set file paths
LICENSE_FILE="License.md"
ENV_FILE=".env.master"
DOCKERIGNORE_FILE=".dockerignore"
GITIGNORE_FILE=".gitignore"
GITLFS_FILE=".gitattributes"

# Create files for Virtual Workspce Microserver Cluster
echo "Setup VirtualWorkspce Microserver Cluster"
cp -f $LICENSE_FILE ../License.md
cp -f $ENV_FILE ../.env
cp -f $GITIGNORE_FILE ../.gitignore
cp -f $GITLFS_FILE ../.gitattributes
cp -f $DOCKERIGNORE_FILE ../.dockerignore

# Create files for research-microservers
echo "Setup research-microservers"
cp -f $LICENSE_FILE ../research-microservers/License.md
# cp -f $ENV_FILE ../research-microservers/.env
cp -f $GITIGNORE_FILE ../research-microservers/.gitignore
cp -f $GITLFS_FILE ../research-microservers/.gitattributes
# cp -f $DOCKERIGNORE_FILE ../research-microservers/.dockerignore

# Create files for template-microserver
echo "Setup template-microserver"
cp -f $LICENSE_FILE template-microserver/License.md
cp -f $ENV_FILE template-microserver/.env
cp -f $GITIGNORE_FILE template-microserver/.gitignore
# cp -f $GITLFS_FILE template-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE template-microserver/.dockerignore


# Create files for nginx-microserver
echo "Setup nginx-microserver"
cp -f $LICENSE_FILE nginx-microserver/License.md
cp -f $ENV_FILE nginx-microserver/.env
cp -f $GITIGNORE_FILE nginx-microserver/.gitignore
# cp -f $GITLFS_FILE nginx-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE nginx-microserver/.dockerignore

# Create files for redis-microserver
echo "Setup redis-microserver"
# curl -sL https://raw.githubusercontent.com/redis/redis/6.2/redis.conf -o redis-microserver/redis.conf
cp -f $LICENSE_FILE redis-microserver/License.md
cp -f $ENV_FILE redis-microserver/.env
cp -f $GITIGNORE_FILE redis-microserver/.gitignore
# cp -f $GITLFS_FILE redis-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE redis-microserver/.dockerignore

# Create files for dashboard-microserver
echo "Setup dashboard-microserver"
cp -f $LICENSE_FILE dashboard-microserver/License.md
cp -f $ENV_FILE dashboard-microserver/.env
cp -f $GITIGNORE_FILE dashboard-microserver/.gitignore
# cp -f $GITLFS_FILE dashboard-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE dashboard-microserver/.dockerignore

# Create files for python-microserver
echo "Setup python-microserver"
cp -f $LICENSE_FILE python-microserver/License.md
cp -f $ENV_FILE python-microserver/.env
cp -f $GITIGNORE_FILE python-microserver/.gitignore
# cp -f $GITLFS_FILE python-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE python-microserver/.dockerignore

# Create files for unity-microserver
echo "Setup unity-microserver"
cp -f $LICENSE_FILE unity-microserver/License.md
# cp -f $ENV_FILE unity-microserver/.env
cp -f $GITIGNORE_FILE unity-microserver/.gitignore
cp -f $GITLFS_FILE unity-microserver/.gitattributes
# cp -f $DOCKERIGNORE_FILE unity-microserver/.dockerignore

# Create files for browser-microserver
echo "Setup browser-microserver"
cp -f $LICENSE_FILE browser-microserver/License.md
cp -f $ENV_FILE browser-microserver/.env
cp -f $GITIGNORE_FILE browser-microserver/.gitignore
# cp -f $GITLFS_FILE browser-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE browser-microserver/.dockerignore

# Display success message
echo "Created $LICENSE_FILE, $ENV_FILE, $GITIGNORE_FILE, $GITLFS_FILE, and $DOCKERIGNORE_FILE files."
