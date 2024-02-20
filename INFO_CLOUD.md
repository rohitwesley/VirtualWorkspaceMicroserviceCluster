
---
| [BACK](README.md)

| [MICROCLUSTER](microservers/INFO.md)
| [MICROSERVICE](INFO_PROJMANG.md)
| [API](INFO_DOC.md)
| [CLOUD](INFO_CLOUD.md)
| [LICENSE](LICENSE.md)

# Microservice Network Setup

# Express.js Docker-Compose Application README

---

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
5. [Microservice Network Setup](#microservice-network-setup)
    - [Docker-Compose Setup](#docker-compose-setup)
    - [Dockerfile Setup](#dockerfile-setup)
4. [Running the Application](#running-the-application)
5. [Conclusion](#conclusion)


## Introduction
This document provides a step-by-step guide to setting up microserver's in a Network Cluster using Docker containers and Docker compose.

## Prerequisites

Make sure you have the following installed:
- Docker Desktop
- A text editor (Visual Studio Code, Atom, etc.)
- A command line interface (Terminal on macOS, Command Prompt or PowerShell on Windows, etc.)
- Anaconda or Miniconda

## Anaconda Environment Setup

To set up a Conda environment for testing the server from the notebook or in Docker when the microserver is live, follow these steps:

1. Install Miniconda or Anaconda on your system if you haven't already. Download the appropriate installer from the [Miniconda website](https://docs.conda.io/en/latest/miniconda.html) or the [Anaconda website](https://www.anaconda.com/products/distribution) and follow the installation instructions.
2. Create a new Conda environment for the project. Open a terminal or Anaconda prompt, and run:

```
conda env list
conda create --name virtualworkspace-microserver
conda env list
```
3. Activate the new Conda environment:

```
conda activate virtualworkspace-microserver
```
4. Install the required packages for the FastAPI server and Gradio frontend:

```
pip install -r app/requirements.txt
```


## Node Package Manager (NPM/NodeJs) Setup

1. Go to the official Node.js website's download page: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

2. Download the installer corresponding to your OS and system architecture (Windows, macOS, Linux, etc.).

3. Run the installer and follow the prompts. The installer will install both Node.js and npm, the Node package manager.

4. update npm:
```
sudo npm install -g npm
```

## Docker-Compose Setup

Install Docker Compose:

```
sudo npm install -g docker-compose
```

## Dockerfile Setup

Create a `Dockerfile` in your project root:

```
touch Dockerfile
```

In your `Dockerfile`, specify a base image and copy your local code into the Docker image:

```

# Use an official Node.js runtime as a parent image
FROM node:lts-slim

ARG BUILD_DIR="/usr/app"

# Set the working directory
# WORKDIR /usr/src/app
WORKDIR $BUILD_DIR

# Optionally update npm to the latest version
RUN npm install -g npm

# Install npm-check-updates globally
RUN npm install -g npm-check-updates

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Update NodeJs packages
RUN ncu -u
# RUN npm update --save/--save-dev

# Install any needed packages
RUN npm install -d

# Copy the rest of the application code
COPY . .

# Copy the public directory
COPY ./public $BUILD_DIR/public

# Make sure Webpacky is compiled
RUN npm run build

# Expose the port the application will run on
ARG APP_PORT
EXPOSE 3000 ${APP_PORT}

# Start the application
CMD ["npm", "start"]

```

Now, create a `docker-compose.yml` file:

```
touch docker-compose.yml
```

In `docker-compose.yml`, specify the services for your application:

```

version: '3.9'

services:
  # @brief Template microserver service
  template-microserver:
    build: 
      context: .
    # @brief Container name
    container_name: template-microserver
    # @brief Use the custom image
    image: "vw-template-microservice"
    # @brief Port mapping
    ports:
      - 3000:3000
    # @brief Load environment variables from the .env file
    env_file:
      - ./.env
    # @brief Restart policy
    restart: always
    # @brief Define the network used by the service
    networks:
      - vw-network-cluster
    
# @brief Volume definition for persistent data storage
volumes:
  template-volume:
    driver: local

# @brief Network definition
networks:
  vw-network-cluster:
    external: true

```

## Running the microserver
Now that you have set up your application, you can build and run it using Docker Compose:

```
docker-compose up --build
```
[for clean build with no cash from previous build]
```
docker-compose up --force-recreate --build
```

Navigate to `http://localhost:3000` in your web browser to view your application.

# Microservice Network Cluster

## Setting up a Docker Network with multiple microservices

### **Step 1:** Create a network

```
docker network create vw-network-cluster
```

>Check network list for network
>```
>docker network ls
>```

### **Step 2:** Update your Compose files

In all your microservice have individual Docker Compose files, only replace the networks section with this:

```

version: '3.9'

services:
  # @brief Template microserver service
  template-microserver:
    build: 
      context: .
    # @brief Container name
    container_name: template-microserver
    # @brief Use the custom image
    image: "vw-template-microservice"
    # @brief Port mapping
    ports:
      - 3000:3000
    # @brief Load environment variables from the .env file
    env_file:
      - ./.env
    # @brief Restart policy
    restart: always
    # @brief Define the network used by the service
    networks:
      - vw-network-cluster
    
# @brief Volume definition for persistent data storage
volumes:
  template-volume:
    driver: local
  
# Network definition
networks:
  vw-network-cluster:
    external: true

```
This tells Docker Compose to use the vw-network-cluster network that you created earlier.

If you have one big Docker Composer file for all the microservices then add dependancies in each microservice and add them to the same network

```

version: '3.9'

services:
  # @brief Template microserver service
  template-microserver:
    build: 
      context: .
    # @brief Container name
    container_name: template-microserver
    # @brief Use the custom image
    image: "vw-template-microservice"
    # @brief Port mapping
    ports:
      - 3000:3000
    # @brief Load environment variables from the .env file
    env_file:
      - ./.env
    # @brief Restart policy
    restart: always
    # @brief Dependencies on other services
    depends_on:
      - redis-microserver
    # @brief Define the network used by the service
    networks:
      - vw-network-cluster

  
# Network definition
networks:
  vw-network-cluster:
    external: true
```


### **Step 3:** Setup dependancies

In your microserver Docker Compose file, remove the depends_on line. Since Docker can't enforce dependencies across separate Compose files, this line doesn't do anything.

After doing these steps, you should be able to start your services. The services will be able to communicate with each other over the vw-network-cluster network. You can refer to the service by its name (like redis-microserver) when making network requests.

---


## Azure & Github Cloud Setup

---

> To set up a Docker container for your project and automate deployment to Azure and GitHub, follow these steps:

1. Create a `Dockerfile` in the root directory of your project:
```5
# Use a base image with the required dependencies
FROM node:lts-slim

ARG BUILD_DIR="/usr/app"
ARG CONTAINER_USER="node"
ARG CONTAINER_EXPOSE_PORT="8000"

# Set the working directory
# WORKDIR /usr/src/app
WORKDIR $BUILD_DIR

# Optionally update npm to the latest version
RUN npm install -g npm

# Install npm-check-updates globally
RUN npm install -g npm-check-updates

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Update NodeJs packages
RUN ncu -u
# RUN npm update --save/--save-dev

# Install any needed packages
RUN npm install -d

# Copy the rest of the application code
COPY . .

# Copy the public directory
COPY ./public $BUILD_DIR/public

# Make sure Webpacky is compiled
RUN npm run build

# Expose the port the application will run on
ARG APP_PORT
EXPOSE 3000 ${APP_PORT}

# Start the application
CMD ["npm", "start"]

```

Replace `node:lts-slim` with the appropriate base image for your project, and adjust the installation commands and exposed port as needed.

2. Build the Docker image:
```
docker build -t your-username/VirtualWorkspaceMicroserviceCluster .
```
3. Run the Docker container locally:
```
docker run -p 3000:3000 your-username/VirtualWorkspaceMicroserviceCluster
```
4. Push the Docker image to a container registry (e.g., Docker Hub):
```
docker login
docker push your-username/VirtualWorkspaceMicroserviceCluster
```
5. Deploy the Docker container to Azure:

5.1. [Chek you IP](https://certbot.eff.org/instructions) if you haven't already.

5.1. Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) if you haven't already.

5.2. Log in to your Azure account:
```
az login
```
5.3. Create a resource group:
```
az group create --name myResourceGroup --location eastus
```
Replace `myResourceGroup` and `eastus` with the desired resource group name and location.

5.4. Create an Azure Container Instance:
```
az container create --resource-group myResourceGroup --name VirtualWorkspaceMicroserviceCluster --image your-username/VirtualWorkspaceMicroserviceCluster --dns-name-label VirtualWorkspaceMicroserviceCluster --ports 3000
```
Replace `myResourceGroup`, `VirtualWorkspaceMicroserviceCluster`, `your-username/VirtualWorkspaceMicroserviceCluster`, and `VirtualWorkspaceMicroserviceCluster`r with the appropriate values.

5.5. Get the public IP address and FQDN of your deployed container:
```
az container show --resource-group myResourceGroup --name VirtualWorkspaceMicroserviceCluster --query "{FQDN:ipAddress.fqdn,IPAddress:ipAddress.ip}" --out table
```
You can now access your application using the FQDN and IP address.

6. Test Docker Setup:
6.1. Access Docker Console :
```
docker exec -it nginx-microserver /bin/bash
ls /etc/ssl/
```
6.2. Access Docker logs :
```
docker logs nginx-microserver
```
6.3. Clean cashed Docker build :
```
docker-compose build --no-cache; docker-compose up -d --force-recreate
```
6.3. Recreate Docker Container only :
```
 docker-compose up -d --force-recreate --build
```
6.5. Search active ports :
```
 netstat -ano | findstr :80       
```

7. Set up GitHub Actions to automate deployment:
7.1. In your GitHub repository, create a `.github/workflows` directory and a `deploy.yml` file inside it.

7.2. Add the following GitHub Actions workflow to the `deploy.yml` file:

```
name: Deploy to Azure

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Log in to Docker Hub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKER_HUB_USERNAME }}
        password: ${{ secrets.DOCKER_HUB_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v2
      with:
        context: .
        push: true
        tags: your-username/VirtualWorkspaceMicroserviceCluster:latest

    - name: Deploy to Azure Container Instances
      uses: azure/
```
---

## Run, Debug, Troubleshoot multiple microservices

To debug the microservice cluster you can do the following steps:
>For the sake of argument lets check to ensure the connectivity between the `dashboard-microserver` and `redis-microserver` containers.

>### 1. **Check if both containers are running and connected to the same network**
>
>First, make sure both the dashboard-microserver and redis-microserver containers are running and connected to the vw-network-cluster network.
>
>```
>docker ps
>docker network inspect vw-network-cluster
>```
>
>This will show you the details of the network and the containers connected to it. Verify that both containers are listed under the "Containers" section.
>
>### 2. **Check if the Redis container is listening on the correct port**
>
>You can use the `docker exec` command to run `redis-cli` inside the Redis container to check if it's running correctly.
>
>```
>docker exec -it redis-microserver redis-cli ping
>```
>
>If the Redis server is running and reachable, you should see the output "PONG".
>
>### 3. **Update the dashboard-microserver container to use the correct Redis hostname**
>
>In your `.env` file, update the `REDIS_HOST` to the hostname of the Redis container, which should be `redis-microserver`.
>
>```
>REDIS_HOST=redis-microserver
>REDIS_PORT=6380
>```
>
>Make sure your application is using these environment variables to configure the Redis client.
>
>### 4. **Ensure that the dashboard-microserver container can reach the Redis container**
>
>You can use the `docker exec` command to run a simple test inside the dashboard-microserver container to check if it can reach the Redis container.
>
>```
>docker exec -it dashboard-microserver ping redis-microserver
>```
>
>If the Redis container is reachable, you should see ping responses.
>
>### 5. **check docker log for errors**
>
>Regarding the website not being accessible at `http://192.168.50.140:8084/`, make sure that the IP address is correct and the port number is properly exposed in your Docker Compose configuration. If the issue persists, please provide more information about the error messages you're encountering or any relevant logs from the dashboard-microserver container (`docker logs dashboard-microserver`).
>
>### 6. **Check the network** 
>
>Make sure that both your `dashboard-microserver` and `redis-microserver` are in the same Docker network. You can check this by running docker network inspect `<network-name>`. The network name can be found using `docker network ls`.
>
>### 7. **Inspect Redis container** 
>
>Use `docker inspect redis-microserver` to check if the Redis server is indeed running on the correct IP address (`172.19.0.2`).
>
>### 8. **Test connectivity**
>
>You could also try to connect to your Redis server from another container or from the Docker host to test if the Redis server is accessible. You can run `redis-cli -h 172.19.0.2 -p 6380` from another container or from the host if you have redis-cli installed.
>
>### 9. **Check Redis logs** 
>Check the logs of the Redis container using `docker logs redis-microserver` to see if there are any error messages.
>
>### 10. **Firewall or Security Group** 
>Make sure there are no firewall rules or security groups blocking the connection.
>Remember to replace `<network-name> `with your actual network name in the Docker commands. If your `dashboard-microserver` and `redis-microserver` are not in the same Docker network, you will need to either move them into the same network or enable communication between their respective networks.

---

### **Stopping microservice docker container**

```
docker-compose down 
```

### **Removing microservice docker image**

```
docker rmi vw-redis-microservice
```

### **list microservices**

```
docker ps 
```

### **list microservice networks**

```
docker network ls
```

### **Ping microservice**

```
docker exec -it redis-microserver redis-cli -p 6380 ping
```
or
```
docker exec -it redis-microserver redis-cli -p 6380 -a mysecretpassword ping
```

## Conclusion

You have successfully set up your Dockerised Network Cluster using Docker Compose.
Remember that your Dockerised Network Cluster's structure and complexity will grow as you add more features. This guide serves as a starting point, and you may need to adjust the configurations and code to suit the needs of your specific Dockerised Network Cluster.

Happy coding!

End of README document.

---

[END OF PAGE]

[BACK](README.md)

---