#!/bin/bash

# Assuming this script is run in an environment where bash is available
# For Windows, adaptations would be needed for paths and possibly using PowerShell scripts

# Function to download and install setup_microservers
enter_microservice_env()
{
    source /etc/profile
    echo "Entering virtualworkspace-microserver Environment"
    conda acivate virtualworkspace-microserver
    conda env list
    echo "Network-Cluster Environment Setup and Activated"
}

# Function to download and install setup_microservers
setup_network_cluster() {
    
    echo "Setting up virtualworkspace-microserver Environment..."
    cd python-microserver/app
    echo "Preparing Conda Environment"
    ./prepare_environment.sh
    cd ../../

    # Activate virtualworkspace-microserver
    enter_microservice_env

    # Launch redis-microserver
    echo "Setting up redis-microserver..."
    cd redis-microserver/
    # echo "Preparing Environment"
    # ./prepare_environment.sh
    echo "Running Docker setup"
    docker-compose down && docker-compose build --no-cache && docker-compose up --force-recreate -d
    cd ../
    echo "redis-microserver docker container setup and running."

    # Launch dashboard-microserver
    echo "Setting up dashboard-microserver..."
    cd dashboard-microserver/
    # echo "Preparing Environment"
    # ./prepare_environment.sh
    echo "Running Docker setup"
    docker-compose down && docker-compose build --no-cache && docker-compose up --force-recreate -d
    cd ../
    echo "dashboard-microserver docker container setup and running."

    # Launch python-microserver
    echo "Setting up python-microserver..."
    cd python-microserver/
    # echo "Preparing Environment"
    # ./prepare_environment.sh
    echo "Running Docker setup"
    docker-compose down && docker-compose build --no-cache && docker-compose up --force-recreate -d
    cd ../
    echo "python-microserver docker container setup and running."

    echo "Congratulations: Network-Cluster Setup Finished and Running.."

}

# Function to download and install start_microservers
start_network_cluster() {
    
    # Activate virtualworkspace-microserver
    enter_microservice_env

    # Launch redis-microserver
    echo "Launch redis-microserver..."
    cd redis-microserver/
    docker-compose up -d

    # Launch dashboard-microserver
    echo "Launch dashboard-microserver..."
    cd ../dashboard-microserver/
    docker-compose up -d

    # Launch python-microserver
    echo "Launch python-microserver..."
    cd ../python-microserver/
    docker-compose up -d

    cd ../
    echo "Network-Cluster is Running"
    
}

stop_network_cluster() {
    
    # Stoping redis-microserver
    echo "Stoping redis-microserver..."
    cd redis-microserver/
    docker-compose down -d

    # Stoping dashboard-microserver
    echo "Stoping dashboard-microserver..."
    cd ../dashboard-microserver/
    docker-compose down -d

    # Stoping python-microserver
    echo "Stoping python-microserver..."
    cd ../python-microserver/
    docker-compose down -d

    cd ../
    echo "Network-Cluster microserver Stopped"

}

# Install setup_microservers/start_microservers
case "$OS" in
    Linux*)
        echo "Operating System: $OS"
        ;;
    Darwin*)
        echo "Operating System: $OS (macOS)"
        ;;
    Windows*|CYGWIN*|MINGW*)
        echo "Operating System: $OS"
        exit 0
        ;;
    *)
        echo "Operating System: $OS"
        echo "Unsupported operating system."
        exit 1
        ;;
esac

# Prompt user for installation choice
echo "Would you like to install or start network cluster? [setup/start/stop]"
read CLUSTER_CHOICE
if [ "$CLUSTER_CHOICE" = "setup" ]; then
    # Setup microservers
    setup_network_cluster
elif [ "$CLUSTER_CHOICE" = "start" ]; then
    # Start microservers
    start_network_cluster
elif [ "$CLUSTER_CHOICE" = "stop" ]; then
    # Stop microservers
    stop_network_cluster
else
    echo "Invalid choice. Exiting."
    exit 1
fi

