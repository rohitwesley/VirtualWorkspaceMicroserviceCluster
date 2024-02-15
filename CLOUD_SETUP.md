
# Cloud Setup
---
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

[END OF PAGE]

[BACK](README.md)