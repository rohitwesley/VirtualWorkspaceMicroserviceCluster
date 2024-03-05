
---
| [BACK](README.md)

| [MICROCLUSTER](microservers/INFO.md)
| [MICROSERVICE](INFO_PROJMANG.md)
| [API](INFO_DOC.md)
| [CLOUD](INFO_CLOUD.md)
| [LICENSE](LICENSE.md)

---

# Microservice Network Setup

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
    - [Anaconda Environment Setup](#anaconda-environment-setup)
    - [Node Package Manager (NPM/NodeJs) Setup](#node-package-manager-npmnodejs-setup)
3. [Microservice Network Setup](#microservice-network-setup)
    - [Docker-Compose Setup](#docker-compose-setup)
    - [Dockerfile Setup](#dockerfile-setup)
4. [Microservice Network Cluster](#microservice-network-cluster)
5. [Microserver Environment setup](#microserver-environment-setup)
6. [Start the Microservers](#start-the-microserver)
7. [Squarespace Domain and SSL Setup](#squarespace-domain-and-ssl-setup)
8. [Azure Docker Microservice's Cluster Setup](#azure-docker-microservices-cluster-setup)
9. [Run, Debug, Troubleshoot Multiple Microservices](#run-debug-troubleshoot-multiple-microservices)
10. [Conclusion](#conclusion)



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

# Microservice Network Cluster

Setting up a Docker Network with multiple microservices:

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

## Microserver Environment Setup

1. Create a `.env.master` file using the `.env.example` Template and fill in all the environment variables to the server and place it in the microservers folder.

>**Key Importan Variables To set**
>  1. Setup the server IP address env variables.
>  2. Direct the env variable to the Local Media absolute path.
>  3. Direct the env variable to the Local SSL absolute path.
>  4. Setup the Redis env variables.
>

2. Update `env.Setup.sh` with all required microservers and their paths

3. Run bash script

```
./env.Setup.sh
```

---

## Start the Microservers
Now that you have set up your application, you can build and run it using Docker Compose:

```
docker-compose up --build
```
>**For clean build:**
>```
>docker-compose up --force-recreate --build
>``` 
>---
>OR
>```
>docker-compose up --force-recreate --build -d
>```

>**For clean build with no cash from previous build:**
>```
>docker-compose down && docker-compose build --no-cache && docker-compose up --force-recreate -d
>```

Navigate to `http://localhost:3000` in your web browser to view your application.


## Squarspace Domain and SSL Setup
To achieve this, you'll need to set up a subdomain (dashboard.tecrt.co) that points to your local workstation, configure your local workstation to accept incoming traffic, and then run the Node.js, Socket.io, and lit-html applications in Docker containers. Here's a step-by-step guide to do that:

1. **Create a subdomain:**

Log in to your GoDaddy account and create a subdomain called "dashboard.tecrt.co". You'll need to create an A record that points to your public IP address. If you have a dynamic IP, consider using a dynamic DNS service like DuckDNS or No-IP.

>a. Log in to your GoDaddy account at [godaddy](https://www.godaddy.com/).
>
>b. Click on your username in the top-right corner, then click on "My Products" in the dropdown menu.
>
>c. Locate your domain (tecrt.co) under the "Domains" section and click on the "DNS" button next to it.
>
>d. Scroll down to the "Records" section and click the "Add" button.
>
>e. Select "A" from the "Type" dropdown menu.
>
>f. In the "Host" field, enter "dashboard" (without quotes).
>
>g. In the "Points to" field, enter your public IP address. You can find your public IP address by searching "What is my IP" on Google or by visiting a website like [IP](https://www.whatismyip.com/).
>
>h. Set the "TTL" (Time to Live) to your desired value, e.g., 1 hour (3600 seconds).
>
>i. Click the "Save" button to create the A record for your subdomain.
>
>j. If you have a dynamic IP, consider using a dynamic DNS service like [DuckDNS](https://www.duckdns.org/) or [No-IP](https://www.noip.com/). Follow their instructions to set up a dynamic DNS hostname that updates with your changing IP address.
>

2. **Configure your router:**

Set up port forwarding on your router to redirect incoming traffic on ports 80 (HTTP) and 443 (HTTPS) to your local workstation. The exact steps depend on your router model, so refer to your router's documentation.

>a. Find the make and model of your router. This information is often printed on a sticker on the router itself or can be found in the router's documentation.
>
>b. Look up the instructions for port forwarding for your specific router model. [PortForward.com](https://portforward.com/router.htm) is a useful resource for finding port forwarding guides for various routers.
>
>c. Access your router's administration interface by entering its IP address in your web browser. The router's IP address is usually something like `192.168.0.1` or `192.168.1.1`.
>
>d. Log in with your router's username and password. If you don't know these credentials, check your router's documentation or search online for the default username and password for your router model.
>
>e. Locate the port forwarding settings in your router's administration interface. This is often found under "Advanced" or "NAT" settings.
>
>f. Create a new port forwarding rule to forward external traffic on ports 80 (HTTP) and 443 (HTTPS) to the internal IP address of your local workstation. Your workstation's internal IP address is usually in the format `192.168.x.x` and can be found in your operating system's network settings.
>
>g. Save the changes and restart your router if necessary.
>

3. **Obtain an SSL certificate:**

To enable HTTPS for your subdomain, you'll need an SSL certificate. You can get a free SSL certificate from Let's Encrypt using a client like Certbot. Follow the instructions on their website to obtain and install the certificate on your local workstation.

>a. Install Certbot on your local workstation. Certbot is a client that helps you obtain and manage SSL certificates from Let's Encrypt. Follow the instructions for your operating system at https://certbot.eff.org/instructions.
>
>b. Once Certbot is installed, open a terminal or command prompt on your workstation and run the following command to request an SSL certificate for your subdomain:
>```
>certbot certonly --manual --preferred-challenges dns -d dashboard.tecrt.co
>```
>
>c. Follow the on-screen instructions. Certbot will ask you to create a DNS TXT record for domain validation. Log in to your GoDaddy account, navigate to the DNS settings for your domain, and create a new TXT record with the provided information.
>
>d. After creating the TXT record, return to the terminal or command prompt where Certbot is running and press "Enter" to continue. Certbot will verify the TXT record and, if successful, issue an SSL certificate for your subdomain.
>
>e. Note the location of the certificate files. Certbot will display the paths to the certificate (`fullchain.pem`) and private key (`privkey.pem`). You'll need these file paths when configuring your Nginx server in the Docker container.
>
>f. Set up automatic certificate renewal by adding a scheduled task or cron job on your local workstation to run the following command:
>```
>certbot renew --quiet
>```
>For example, on Linux or macOS, you can edit your crontab by running `crontab -e` and adding the following line to run the renewal command daily:
>```
>0 0 * * * certbot renew --quiet
>```
>On Windows, you can create a new scheduled task using the Task Scheduler to run the certbot renew --quiet command daily.
>

Now that you've created a subdomain, configured port forwarding on your router, and obtained an SSL certificate, you can proceed with setting up the Docker containers for your Node.js, Socket.io, and lit-html applications as described in the previous steps. Remember to include the SSL certificate files in the Nginx configuration within the Docker container.


4. **Install Docker and Docker Compose:**

If you haven't already, install Docker and Docker Compose on your local workstation. Follow the instructions for your operating system on the Docker website.

5. **Create a `docker-compose.yml` file:**

Create a `docker-compose.yml` file in a new directory on your workstation. This file will define the services for your Node.js, Socket.io, and lit-html applications. Here's an example configuration:
```
version: "3.9"
services:
  web:
    build: ./web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "./web/certs:/etc/nginx/certs"
  api:
    build: ./api
    ports:
      - "3000:3000"
  socket:
    build: ./socket
    ports:
      - "4000:4000"
```

6. **Create Dockerfiles and application directories:**

Create directories for each service (`web`, `api`, and `socket`) in the same directory as your `docker-compose.yml` file. In each directory, create a `Dockerfile` with instructions to build the respective service's Docker image.

For example, create a `Dockerfile` in the `web` directory to set up an Nginx server that handles HTTP/HTTPS and proxies requests to your API and Socket.io services:
```
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY certs /etc/nginx/certs
```
Create a Dockerfile in the api directory for your Express REST API:
```
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```
Create a Dockerfile in the socket directory for your Socket.io server:
```
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```

7. **Configure Nginx:**

Create an nginx.conf file in the web directory to configure the Nginx server. This file should include proxy settings for your API and Socket.io services and the SSL certificate details. Here's an example configuration
```
http {
  upstream api {
    server api:3000;
  }

  upstream socket {
    server socket:4000;
  }

  server {
    listen 80;
    server_name dashboard.tecrt.co;
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl;
    server_name dashboard.tecrt.co;

    ssl_certificate /etc/nginx/certs/dashboard.tecrt.co.pem;
    ssl_certificate_key /etc/nginx/certs/dashboard.tecrt.co-key.pem;

    location / {
      root /usr/share/nginx/html;
    }

    location /api {
      proxy_pass http://api;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
      proxy_pass http://socket;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}

events { }
```
This configuration sets up Nginx to listen on ports 80 and 443, redirecting HTTP traffic to HTTPS. It also proxies requests to the appropriate services based on the request path.

8. **Build and run Docker containers:**

In the directory containing the `docker-compose.yml` file, run the following command to build and start the Docker containers:
```
docker-compose up -d
```
>This command will build the images for each service, create the containers, and start them in detached mode.
>Once you've completed these steps, your dashboard should be accessible at [dashboard.tecrt.co](https://dashboard.tecrt.co), with the Node.js Express API and Socket.io real-time stream running in Docker containers on your local workstation.

---

## Azure Docker Microservice's Cluster Setup
> To set up a Docker container for your project and automate deployment to Azure and GitHub, follow these steps:

1. Create a `Dockerfile` in the root directory of your project:
```
# Use a base image with the required dependencies
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

Replace `node:14` with the appropriate base image for your project, and adjust the installation commands and exposed port as needed.

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

6. Set up GitHub Actions to automate deployment:
6.1. In your GitHub repository, create a `.github/workflows` directory and a `deploy.yml` file inside it.

6.2. Add the following GitHub Actions workflow to the `deploy.yml` file:

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