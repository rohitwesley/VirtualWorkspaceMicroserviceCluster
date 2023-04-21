
# Virtual Workspace Microservice Cluster
---

This repository combines multiple private microservice repositories as submodules, organized under the GitFlow workflow. Follow the steps below to set up the project.

---

## Setup SSH for the microservers

To set up SSH, create the remote repository, and perform all the setup from the terminal, follow these steps:

1. Generate an SSH key (if you haven't already):
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```
>This will create a new SSH key pair using the Ed25519 algorithm. Follow the prompts to save the key pair and set a passphrase (optional).

2. Add your SSH key to your GitHub account:
* Copy your public key (default location: `~/.ssh/id_ed25519.pub`) to the clipboard:
```
cat ~/.ssh/id_ed25519.pub | clip
```
* Go to [GitHub's SSH and GPG keys settings](https://github.com/settings/keys).

* Click "New SSH key" and paste your public key into the "Key" field. Provide a title and click "Add SSH key".

3. Verify your SSH connection to GitHub:
```
ssh -T git@github.com
```
You should see a message like: "Hi your-username! You've successfully authenticated, but GitHub does not provide shell access."

4. Install the `hub` command-line tool (if you haven't already):
For Windows: 
download the [latest release](https://github.com/github/hub/releases) and add the hub executable to your system's PATH.
For macOS:
```
brew install hub
```
For Linux (Debian/Ubuntu):
```
sudo apt-get install hub
```

5. Create the remote "Virtual Workspace Microservice Cluster" repository using `hub`:
```
hub create -p -d "Virtual Workspace Microservice Cluster" VirtualWorkspaceMicroserviceCluster
```
This will create a new private repository on your GitHub account.

6. Now, follow the steps from the previous answer (starting from step 2) to port and organize your private repos into the "Virtual Workspace Microservice Cluster" repository. When cloning the repository, use the SSH URL:
```
git clone git@github.com:your-username/VirtualWorkspaceMicroserviceCluster.git
```
7. In the submodule adding step, use the SSH URL for the submodule as well:
```
git submodule add git@github.com:your-username/private-repo.git modules/private-repo
```
>By following these steps, you'll be able to set up SSH, create the remote repository, and perform all the setup from the terminal.

## Setup Project Folder Structure

### 1. Clone the repository
Use the SSH URL to clone the repository to your local machine:
```sh
git clone git@github.com:your-username/VirtualWorkspaceMicroserviceCluster.git
cd VirtualWorkspaceMicroserviceCluster
```
or
```sh
md VirtualWorkspaceMicroserviceCluster
cd VirtualWorkspaceMicroserviceCluster
git init
```
### 2. Initialize GitFlow
Run the following command to initialize GitFlow in the repository:
```
git flow init -d
```
### 3. Update submodules
Update all submodules to fetch the latest changes:
```
git submodule update --init --recursive
```
### 4. Working with GitFlow branches
The repository is organized using the GitFlow workflow. The main branches are master and develop. Use feature, release, and hotfix branches as needed.

**4.1. Feature branches**

To work on a new feature, create a feature branch:
```
git flow feature start my-feature
```
Once the feature is complete, finish the feature branch:
```
git flow feature finish my-feature
```
**4.2. Release branches**

To prepare a new release, create a release branch:
```
git flow release start my-release
```
After the release is ready, finish the release branch:
```
git flow release finish my-release
```

**4.3. Hotfix branches**

To apply a hotfix, create a hotfix branch:
```
git flow hotfix start my-hotfix
```
Once the hotfix is complete, finish the hotfix branch:
```
git flow hotfix finish my-hotfix
```

### 5. Create dummy commits for all GitFlow branches:
>In **Windows**, you can create an empty file using the `type nul >` command. This is equivalent to the `touch` command in Unix-based systems. To create an empty file called `example.txt`, open the Command Prompt and run:
>```
>type nul > example.txt
>```
>If the file already exists, this command will not modify the file's contents or update its timestamp. If the file does not exist, it will be created as an empty file.
>
>Alternatively, you can use PowerShell to create an empty file with the `New-Item` command:
>```
>New-Item -ItemType File -Path example.txt -Force
>```
>This command will create an empty `example.txt` file or overwrite the existing file if it exists. Remove the `-Force` flag if you want to keep the existing file unchanged.
>

```
# Develop branch
git checkout develop
touch dummy_develop.txt
git add dummy_develop.txt
git commit -m "Dummy commit for develop branch"
```
```
# Feature branch
git checkout -b feature/dummy-feature develop
touch dummy_feature.txt
git add dummy_feature.txt
git commit -m "Dummy commit for feature branch"
git checkout develop
git merge --no-ff feature/dummy-feature
# To Delete the feature branch
git branch -d feature/dummy-feature
```
```
# Release branch
git checkout -b release/dummy-release develop
touch dummy_release.txt
git add dummy_release.txt
git commit -m "Dummy commit for release branch"
git checkout master
git merge --no-ff release/dummy-release
git tag -a dummy-release
# To Delete the feature branch
git branch -d release/dummy-release
git push origin master
```
```
# Hotfix branch
git checkout -b hotfix/dummy-hotfix master
touch dummy_hotfix.txt
git add dummy_hotfix.txt
git commit -m "Dummy commit for hotfix branch"
git checkout master
git merge --no-ff hotfix/dummy-hotfix
git tag -a dummy-hotfix
git checkout develop
git merge --no-ff hotfix/dummy-hotfix
git branch -d hotfix/dummy-hotfix
```
### 6. Create a README.md file to explain the setup:
```
touch README.md
```
Edit the README.md file to provide information about the "Virtual Workspace Microservice Cluster" repository, its modules, and how to set up and use the project. Save the file and commit it:
```
git add README.md
git commit -m "Add README.md with setup instructions"
```
### 7. Push the changes to the remote repository:
```
git push --all
git push --tags
```

>Now, you have combined your private repos into the "Virtual Workspace Microservice Cluster" repository, organized as modules with dummy commits for all GitFlow branches, and added a README.md file with setup instructions.


## Cloud Setup
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

## Contributing

Please follow the GitFlow workflow when making contributions to this repository.


## License

This project is built using open-source components and is NOT open source itself. This software is the property of the author, and any copying, distribution, or modification without the explicit written consent of the author is strictly prohibited. For any inquiries or requests for permission, please contact the author at wesleythomas360@gmail.com.

This README file provides step-by-step instructions for setting up and working with the "Virtual Workspace Microservice Cluster" repository, organized using the GitFlow workflow.
