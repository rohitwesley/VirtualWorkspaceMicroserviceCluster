# Define an array of microserver folder paths]=
$microserverFolders = @("redis-microserver")
# $microserverFolders = @("redis-microserver", "dashboard-microserver")
# $microserverFolders = @("redis-microserver", "python-microserver", "dashboard-microserver")

# Loop through each folder and run the docker-compose up command
ForEach ($folder in $microserverFolders) {
    Write-Host "Starting $folder microserver..."
    cd $folder
    docker-compose up -d
    cd ..
}

# Display success message
Write-Host "All microservers are now running."
