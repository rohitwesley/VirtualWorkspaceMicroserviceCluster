
---
| [START](README.md)

| [MICROCLUSTER](microservers/INFO.md)
| [MICROSERVICE](INFO_PROJMANG.md)
| [API](INFO_DOC.md)
| [CLOUD](INFO_CLOUD.md)
| [LICENSE](LICENSE.md)

# Virtual Workspace Microservice Cluster 

---

>## [Microservice Clust INFO.md](\microservers\INFO.md)
>---
>## [Microservice API Documentation ](\Doxygen\html\index.html)

This repository combines multiple private microservice repositories as submodules, organized under the GitFlow workflow. The repository also includes Doxygen-generated documentation for each microservice, as well as additional resources and tools to help manage and maintain the project. Follow the steps below to set up the project and access its features.

---

## Table of Contents

1. [Setting Up SSH for Microservers](#setting-up-ssh-for-the-microservers)
2. [Project Folder Structure](#project-folder-structure)
3. [Working with GitFlow branches](#working-with-gitflow-branches)
4. [Setting up submodules](#setting-up-submodules)
5. [Environment Setup](#environment-setup)
6. [Cloud Setup](#cloud-setup)
7. [Doxygen Documentation](#doxygen-documentation)
8. [Contributing](#contributing)
9. [License](#license)

---

## Prerequisites

- [Docker](https://www.docker.com/) (v20.10.0 or later)
- [Git](https://git-scm.com/) (v2.25.0 or later)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (v14+)
- [Redis Stack](https://redis.io/)
- Unity (optional, for the Unity client)
- FFmpeg

---

## Setting Up SSH for Microservers

The setup process involves generating an SSH key, adding it to your GitHub account, verifying the connection, installing the 'hub' command-line tool, and creating a remote repository. For detailed step-by-step instructions, please refer to the [HELP_ProjMang](INFO_PROJMANG.md) file.

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

GitFlow is a Git branching model that organizes the project's branches and releases. For detailed instructions on using GitFlow in your project, see the [HELP_ProjMang](INFO_PROJMANG.md) file.

---

## Setting up submodules

Submodules are used to include the microservice repositories within the main repository. To set up the submodules, see the [HELP_ProjMang](INFO_PROJMANG.md) file.

---

## Environment Setup

Setup an [Anaconda](https://docs.anaconda.com/free/navigator/install/) Environment and use it as the Virtual Workspace Microservice Cluster Network Environment.
To setup the Environment see the [Python Microservice](microservers/python-microserver/README.md)
Eg.
```
> conda info --envs   

# conda environments:
#
base                    *  C:\ProgramData\anaconda3
virtualworkspace-microserver  C:\Users\user\.conda\envs\virtualworkspace-microserver

> conda activate virtualworkspace-microserver

> conda info --envs

# conda environments:
#
base                     C:\ProgramData\anaconda3
virtualworkspace-microserver  *  C:\Users\user\.conda\envs\virtualworkspace-microserver

> conda info       

     active environment : virtualworkspace-microserver
    active env location : C:\Users\user\.conda\envs\virtualworkspace-microserver
            shell level : 1
       user config file : C:\Users\user\.condarc
 populated config files : C:\Users\user\.condarc
          conda version : 23.3.1
    conda-build version : 3.24.0
         python version : 3.10.9.final.0
       virtual packages : __archspec=1=x86_64
                          __cuda=12.2=0
                          __win=0=0
       base environment : C:\ProgramData\anaconda3  (read only)
      conda av data dir : C:\ProgramData\anaconda3\etc\conda
  conda av metadata url : None
           channel URLs : https://conda.anaconda.org/conda-forge/win-64
                          https://conda.anaconda.org/conda-forge/noarch
                          https://repo.anaconda.com/pkgs/main/win-64
                          https://repo.anaconda.com/pkgs/main/noarch
                          https://repo.anaconda.com/pkgs/r/win-64
                          https://repo.anaconda.com/pkgs/r/noarch
                          https://repo.anaconda.com/pkgs/msys2/win-64
                          https://repo.anaconda.com/pkgs/msys2/noarch
          package cache : C:\ProgramData\anaconda3\pkgs
                          C:\Users\user\.conda\pkgs
                          C:\Users\user\AppData\Local\conda\conda\pkgs
       envs directories : C:\Users\user\.conda\envs
                          C:\ProgramData\anaconda3\envs
                          C:\Users\user\AppData\Local\conda\conda\envs
               platform : win-64
             user-agent : conda/23.3.1 requests/2.28.1 CPython/3.10.9 Windows/10 Windows/10.0.22621 aau/0.4.3 c/LC0oUxRR0PcFDkwS747o1g s/CzpWn_A0YgsU0yFxUYPw5Q e/gWNhDQXf31RBz9Rv-COcQQ
          administrator : False
             netrc file : None
           offline mode : False

> conda install --file path\to\VirtualWorkspaceNetwork\requirements.txt

>_
```

>***Python Lib Setup:*** 
>
>>Save Active Conda Environment package list for distribution across virtual workspace microservice network with your custom packages using :
>>
>
>```
> pip freeze > requirements.txt
>```


## Cloud Setup

The repository is set up to work with cloud environments. To configure the cloud setup, see the [Cloud Setup](INFO_CLOUD.md) file.

---

## Doxygen Documentation

Each microservice has its own Doxygen-generated documentation. To generate and access the documentation, see the [HELP_Doc](INFO_DOC.md) file.

---
## Further Resources

- [HELP_Doc](INFO_DOC.md): Detailed guidelines for project documentation.
- [HELP_ProjMang](INFO_PROJMANG.md): A guide to project management practices within the repository.
- [CLOUD_SETUP](INFO_CLOUD.md): A guide for project microservice cloud managment.

---

## Contributors
<!-- Contributions are welcome! Feel free to open an issue or submit a pull request. -->
- Wesley Thomas

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for more information on how to get involved.

---
## Acknowledgements

- [Redis](https://redis.io/) for their amazing open-source project
- [Docker](https://www.docker.com/) for their containerization platform
- [OpenAI](https://www.openai.com/) for the GPT-4 architecture
- etc...

---

## License

"This project is built using open-source components and is NOT open source itself. This software is the property of the author, and any copying, distribution, or modification without the explicit written consent of the author is strictly prohibited. For any inquiries or requests for permission, please contact the author at wesleythomas360@gmail.com."

<!-- This project is licensed under the [MIT License.](https://opensource.org/license/mit/) -->

This project is licensed under a [CUSTOM License.](LICENSE.md)

---

[END OF PROJECT](README.md)

---

/**
  @page README Virtual Workspace Microservice Cluster

  This repository combines multiple private microservice repositories as submodules, organized under the GitFlow workflow. The repository also includes Doxygen-generated documentation for each microservice, as well as additional resources and tools to help manage and maintain the project. Follow the steps below to set up the project and access its features.

  @section toc Table of Contents

  1. [Setting Up SSH for Microservers](#setting-up-ssh-for-the-microservers)
  2. [Project Folder Structure](#project-folder-structure)
  3. [Working with GitFlow branches](#working-with-gitflow-branches)
  4. [Setting up submodules](#setting-up-submodules)
  5. [Cloud Setup](#cloud-setup)
  6. [Doxygen Documentation](#doxygen-documentation)
  7. [Contributing](#contributing)
  8. [License](#license)

  @section setting-up-ssh-for-the-microservers Setting Up SSH for Microservers

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

  Each microservice has its own Doxygen-generated documentation. To generate and access the documentation, see the [HELP_Doc](INFO_DOC.md) file.

  @section further-resources Further Resources

  - [HELP_Doc](INFO_DOC.md): Detailed guidelines for project documentation.
  - [HELP_ProjMang](INFO_PROJMANG.md): A guide to project management practices within the repository.

  @section contributing Contributing

  Please see the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines on how to contribute to the project.
  Please follow the GitFlow workflow when making contributions to this repository.

  @section license License

  "This project is built using open-source components and is NOT open source itself. This software is the property of the author, and any copying, distribution, or modification without the explicit written consent of the author is strictly prohibited. For any inquiries or requests for permission, please contact the author at wesleythomas360@gmail.com."

  This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

  This `README` file provides step-by-step instructions for setting up and working with the "Virtual Workspace Microservice Cluster" repository, organized using the GitFlow workflow.

*/