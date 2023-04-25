
/**
  @page README Virtual Workspace Microservice Cluster

  This repository combines multiple private microservice repositories as submodules, organized under the GitFlow workflow. The repository also includes Doxygen-generated documentation for each microservice, as well as additional resources and tools to help manage and maintain the project. Follow the steps below to set up the project and access its features.

  @section toc Table of Contents

  1. [Setting up SSH for the microservers](#setting-up-ssh-for-the-microservers)
  2. [Project Folder Structure](#project-folder-structure)
  3. [Working with GitFlow branches](#working-with-gitflow-branches)
  4. [Setting up submodules](#setting-up-submodules)
  5. [Cloud Setup](#cloud-setup)
  6. [Doxygen Documentation](#doxygen-documentation)
  7. [Contributing](#contributing)
  8. [License](#license)

  @section setting-up-ssh-for-the-microservers Setting up SSH for the microservers

  ...

  @section project-folder-structure Project Folder Structure

  ...

  @section working-with-gitflow-branches Working with GitFlow branches

  ...

  @section setting-up-submodules Setting up submodules

  ...

  @section cloud-setup Cloud Setup

  ...

  @section doxygen-documentation Doxygen Documentation

  Each microservice has its own Doxygen-generated documentation. To generate and access the documentation, see the [HELP_Doc](HELP_Doc) file.

  @section further-resources Further Resources

  - [HELP_Doc](./HELP_Doc): Detailed guidelines for project documentation.
  - [HELP_ProjMang](./HELP_ProjMang): A guide to project management practices within the repository.

  @section contributing Contributing

  Please see the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines on how to contribute to the project.
  Please follow the GitFlow workflow when making contributions to this repository.

  @section license License

  "This project is built using open-source components and is NOT open source itself. This software is the property of the author, and any copying, distribution, or modification without the explicit written consent of the author is strictly prohibited. For any inquiries or requests for permission, please contact the author at wesleythomas360@gmail.com."

  This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

  This `README` file provides step-by-step instructions for setting up and working with the "Virtual Workspace Microservice Cluster" repository, organized using the GitFlow workflow.

*/

# Virtual Workspace Microservice Cluster [Doc](\Doxygen\html\index.html)

This repository combines multiple private microservice repositories as submodules, organized under the GitFlow workflow. The repository also includes Doxygen-generated documentation for each microservice, as well as additional resources and tools to help manage and maintain the project. Follow the steps below to set up the project and access its features.

---

## Table of Contents

1. [Setting up SSH for the microservers](#setting-up-ssh-for-the-microservers)
2. [Project Folder Structure](#project-folder-structure)
3. [Working with GitFlow branches](#working-with-gitflow-branches)
4. [Setting up submodules](#setting-up-submodules)
5. [Cloud Setup](#cloud-setup)
6. [Doxygen Documentation](#doxygen-documentation)
7. [Contributing](#contributing)
8. [License](#license)

---

## Setting up SSH for the microservers

1. **Generate an SSH key**: If you haven't already, generate an SSH key using the Ed25519 algorithm with

```
ssh-keygen -t ed25519 -C "your_email@example.com"
```
>This will create a new SSH key pair using the Ed25519 algorithm. Follow the prompts to save the key pair and set a passphrase (optional).
Follow the prompts to save the key pair and set a passphrase (optional).

2. **Add your SSH key to your GitHub account**:

- Copy your public key (default location: `~/.ssh/id_ed25519.pub`) to the clipboard:
  ```
  cat ~/.ssh/id_ed25519.pub | clip
  ```
- Go to [GitHub's SSH and GPG keys settings](https://github.com/settings/keys).
- Click "New SSH key" and paste your public key into the "Key" field. Provide a title and click "Add SSH key".

3. **Verify your SSH connection to GitHub**:

```
ssh -T git@github.com
```
You should see a message like: "Hi your-username! You've successfully authenticated, but GitHub does not provide shell access."

4. **Install the `hub` command-line tool** (if you haven't already):

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

5. **Create the remote "Virtual Workspace Microservice Cluster" repository using `hub`**:

```
hub create -p -d "Virtual Workspace Microservice Cluster" VirtualWorkspaceMicroserviceCluster
```
This will create a new private repository on your GitHub account.

6. Now, follow the steps from the previous answer (starting from step 2) to port and organize your private repos into the "Virtual Workspace Microservice Cluster" repository. When cloning the repository, use the SSH URL:

```
git clone git@github.com:your-username/VirtualWorkspaceMicroserviceCluster.git
```
>By following these steps, you'll be able to set up SSH, create the remote repository, and perform all the setup from the terminal.


---

## Project Folder Structure

The repository includes the following directories:

- `Doxygen`: Contains the Doxyfile configuration file and the generated Doxygen documentation for the microservices.
- `microservices`: Contains live microservice submodules.
- `research-microservices`: Contains research microservice submodules.

In addition, the repository contains the following files:

- `README`: This file provides an overview of the project and setup instructions.
- `HELP_Doc`: Provides instructions on how to generate and access the Doxygen documentation.
- `HELP_ProjMang`: Offers guidance on managing the project, including working with GitFlow branches and submodules.
- `.env`: Contains environment variables for the project
- `.gitignore`: Lists files and directories that should not be tracked by Git.
- `Doxfile`: The Doxyfile configuration file used to generate Doxygen documentation for each microservice.
- `LICENSE`: The license file for the repository.

---

## Project Tree
```
.
├── .gitignore
├── Doxfile
├── Doxygen
│ ├── index.html
│ └── ...
├── HELP_Doc
├── HELP_ProjMang
├── LICENSE
├── microservices
│ ├── microservice-1
│ │ ├── Doxyfile
│ │ ├── LICENSE
│ │ ├── README.md
│ │ └── ...
│ ├── microservice-2
│ │ ├── Doxyfile
│ │ ├── LICENSE
│ │ ├── README.md
│ │ └── ...
│ └── ...
├── README.md
└── research-microservices
│ ├── research-microservice-1
│ │ ├── Doxyfile
│ │ ├── LICENSE
│ │ ├── README.md
│ │ └── ...
│ ├── research-microservice-2
│ │ ├── Doxyfile
│ │ ├── LICENSE
│ │ ├── README.md
│ │ └── ...
└── ...
```
---

## Working with GitFlow branches

GitFlow is a Git branching model that organizes the project's branches and releases. For detailed instructions on using GitFlow in your project, see the [HELP_ProjMang](HELP_ProjMang) file.

---

## Setting up submodules

Submodules are used to include the microservice repositories within the main repository. To set up the submodules, see the [HELP_ProjMang](HELP_ProjMang) file.

---

## Cloud Setup

The repository is set up to work with cloud environments. To configure the cloud setup, see the [Cloud Setup](CLOUD_SETUP.md) file.

---

## Doxygen Documentation

Each microservice has its own Doxygen-generated documentation. To generate and access the documentation, see the [HELP_Doc](HELP_Doc) file.

---
## Further Resources

- [HELP_Doc](./HELP_Doc): Detailed guidelines for project documentation.
- [HELP_ProjMang](./HELP_ProjMang): A guide to project management practices within the repository.

---

## Contributing

Please see the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines on how to contribute to the project.
Please follow the GitFlow workflow when making contributions to this repository.

---

## License

"This project is built using open-source components and is NOT open source itself. This software is the property of the author, and any copying, distribution, or modification without the explicit written consent of the author is strictly prohibited. For any inquiries or requests for permission, please contact the author at wesleythomas360@gmail.com."


This `README` file provides step-by-step instructions for setting up and working with the "Virtual Workspace Microservice Cluster" repository, organized using the GitFlow workflow.

---
[END]