# Set file paths
$ENV_FILE=".env.example"
$DOCKERIGNORE_FILE=".dockerignore"
$GITIGNORE_FILE=".gitignore"

# Create files for virtual Workspce Microserver Cluster
Write-Output "Setup VirtualWorkspce Microserver Cluster"
Copy-Item -Path $ENV_FILE -Destination ../.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination ../.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination ../.dockerignore -Force

# Create files for nginx-microserver
Write-Output "Setup nginx-microserver"
Copy-Item -Path $ENV_FILE -Destination nginx-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination nginx-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination nginx-microserver/.dockerignore -Force

# Create files for redis-microserver
Write-Output "Setup redis-microserver"
# Invoke-WebRequest -Uri https://raw.githubusercontent.com/redis/redis/6.2/redis.conf -OutFile redis-microserver/redis.conf
Copy-Item -Path $ENV_FILE -Destination redis-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination redis-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination redis-microserver/.dockerignore -Force

<<<<<<< HEAD
=======
# Create files for python-microserver
Write-Output "Setup python-microserver"
Copy-Item -Path $ENV_FILE -Destination python-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination python-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination python-microserver/.dockerignore -Force

# Create files for ffmpeg-microserver
Write-Output "Setup ffmpeg-microserver"
Copy-Item -Path $ENV_FILE -Destination ffmpeg-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination ffmpeg-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination ffmpeg-microserver/.dockerignore -Force

>>>>>>> develop
# Create files for dashboard-microserver
Write-Output "Setup dashboard-microserver"
Copy-Item -Path $ENV_FILE -Destination dashboard-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination dashboard-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination dashboard-microserver/.dockerignore -Force

<<<<<<< HEAD
# Create files for python-microserver
Write-Output "Setup python-microserver"
Copy-Item -Path $ENV_FILE -Destination python-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination python-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination python-microserver/.dockerignore -Force

=======
>>>>>>> develop
# Create files for unity-microserver
Write-Output "Setup unity-microserver"
Copy-Item -Path $ENV_FILE -Destination unity-microserver/.env -Force
Copy-Item -Path $GITIGNORE_FILE -Destination unity-microserver/.gitignore -Force
Copy-Item -Path $DOCKERIGNORE_FILE -Destination unity-microserver/.dockerignore -Force

# Display success message
Write-Output "Created $ENV_FILE, $DOCKERIGNORE_FILE, and $GITIGNORE_FILE files."