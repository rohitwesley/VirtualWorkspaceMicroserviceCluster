#!/bin/bash

# Set file paths
LICENSE_FILE="LICENSE.md"
ENV_FILE=".env.master"
DOCKERIGNORE_FILE=".dockerignore"
GITIGNORE_FILE=".gitignore"
GITLFS_FILE=".gitattributes"

BASEDIR=$(dirname "$0")
pushd $BASEDIR

# Create files for Virtual Workspce Microserver Cluster
echo "Setup VirtualWorkspce Microserver Cluster"
cp -f $LICENSE_FILE ../LICENSE.md
cp -f $ENV_FILE ../.env
cp -f $GITIGNORE_FILE ../.gitignore
cp -f $GITLFS_FILE ../.gitattributes
cp -f $DOCKERIGNORE_FILE ../.dockerignore   

# Create files for research-microservers
echo "Setup research-microservers"
cp -f $LICENSE_FILE ../research-microservers/LICENSE.md
# cp -f $ENV_FILE ../research-microservers/.env
cp -f $GITIGNORE_FILE ../research-microservers/.gitignore
cp -f $GITLFS_FILE ../research-microservers/.gitattributes
# cp -f $DOCKERIGNORE_FILE ../research-microservers/.dockerignore

# Create files for template-microserver
echo "Setup template-microserver"
cp -f $LICENSE_FILE template-microserver/LICENSE.md
cp -f $ENV_FILE template-microserver/.env
cp -f $GITIGNORE_FILE template-microserver/.gitignore
cp -f $GITLFS_FILE template-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE template-microserver/.dockerignore


# Create files for nginx-microserver
echo "Setup nginx-microserver"
cp -f $LICENSE_FILE nginx-microserver/LICENSE.md
cp -f $ENV_FILE nginx-microserver/.env
cp -f $GITIGNORE_FILE nginx-microserver/.gitignore
cp -f $GITLFS_FILE nginx-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE nginx-microserver/.dockerignore

# Create files for redis-microserver
echo "Setup redis-microserver"
# curl -sL https://raw.githubusercontent.com/redis/redis/6.2/redis.conf -o redis-microserver/redis.conf
cp -f $LICENSE_FILE redis-microserver/LICENSE.md
cp -f $ENV_FILE redis-microserver/.env
cp -f $GITIGNORE_FILE redis-microserver/.gitignore
cp -f $GITLFS_FILE redis-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE redis-microserver/.dockerignore

# Create files for dashboard-microserver
echo "Setup nodejs-microserver"
cp -f $LICENSE_FILE nodejs-microserver/LICENSE.md
cp -f $ENV_FILE nodejs-microserver/.env
cp -f $GITIGNORE_FILE nodejs-microserver/.gitignore
cp -f $GITLFS_FILE nodejs-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE nodejs-microserver/.dockerignore

# Create files for rust-microserver
echo "Setup rust-microserver"
cp -f $LICENSE_FILE rust-microserver/LICENSE.md
cp -f $ENV_FILE rust-microserver/.env
cp -f $GITIGNORE_FILE rust-microserver/.gitignore
cp -f $GITLFS_FILE rust-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE rust-microserver/.dockerignore

# Create files for python-microserver
echo "Setup python-microserver"
cp -f $LICENSE_FILE python-microserver/LICENSE.md
cp -f $ENV_FILE python-microserver/.env
cp -f $GITIGNORE_FILE python-microserver/.gitignore
cp -f $GITLFS_FILE python-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE python-microserver/.dockerignore

# Create files for unity-microserver
echo "Setup unity-microserver"
cp -f $LICENSE_FILE unity-microserver/LICENSE.md
# cp -f $ENV_FILE unity-microserver/.env
cp -f $GITIGNORE_FILE unity-microserver/.gitignore
cp -f $GITLFS_FILE unity-microserver/.gitattributes
# cp -f $DOCKERIGNORE_FILE unity-microserver/.dockerignore

# Create files for webnet-microserver
echo "Setup webnet-microserver"
cp -f $LICENSE_FILE webnet-microserver/LICENSE.md
cp -f $ENV_FILE webnet-microserver/.env
cp -f $GITIGNORE_FILE webnet-microserver/.gitignore
cp -f $GITLFS_FILE webnet-microserver/.gitattributes
cp -f $DOCKERIGNORE_FILE webnet-microserver/.dockerignore

# Create files for webapp-microserver
echo "Setup webapp-microserver"
cp -f $LICENSE_FILE webapp-microserver/LICENSE.md
cp -f $ENV_FILE webapp-microserver/.env
cp -f $GITIGNORE_FILE webapp-microserver/.gitignore
cp -f $GITLFS_FILE webapp-microserver/.gitattributes
# cp -f $DOCKERIGNORE_FILE webapp-microserver/.dockerignore

popd

# Display success message
echo "Created $LICENSE_FILE, $ENV_FILE, $GITIGNORE_FILE, $GITLFS_FILE, and $DOCKERIGNORE_FILE files."
