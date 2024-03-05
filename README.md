
---
| [START](README.md)

| [MICROCLUSTER](microservers/INFO.md)
| [MICROSERVICE](INFO_PROJMANG.md)
| [API](INFO_DOC.md)
| [CLOUD](INFO_CLOUD.md)
| [LICENSE](LICENSE.md)

---

# Virtual Workspace Microservice Cluster 


>## [Microservice Clust INFO.md](microservers/INFO.md)

>## [Microservice API Documentation ](\Doxygen\html\index.html)

This repository combines multiple private microservice repositories as submodules, organized under the GitFlow workflow. The repository also includes Doxygen-generated documentation for each microservice, as well as additional resources and tools to help manage and maintain the project. Follow the steps below to set up the project and access its features.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up SSH for Microservers](#setting-up-ssh-for-microservers)
- [Project Folder Structure](#project-folder-structure)
- [Working with GitFlow Branches](#working-with-gitflow-branches)
- [Setting Up Submodules](#setting-up-submodules)
- [Environment Setup](#environment-setup)
- [Cloud Setup](#cloud-setup)
- [Doxygen Documentation](#doxygen-documentation)
- [Further Resources](#further-resources)
- [Acknowledgements](#acknowledgements)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Prerequisites

- Docker (v20.10.0 or later)
- Git (v2.25.0 or later)
- Docker Compose
- Node.js (v14+)
- Redis Stack
- Unity (optional, for Unity client integration)
- FFmpeg

## Setting Up SSH for Microservers

Generate an SSH key, add it to your GitHub account, verify the connection, and install the 'hub' tool for repository management. Detailed steps can be found in [INFO_ProjMang](INFO_PROJMANG.md).

## Project Folder Structure

- `Doxygen`: Generated Doxygen documentation.
- `microservices`: Live microservice submodules.
- `research-microservices`: Research microservice submodules.
- Additional key files: `README`, `INFO_Doc`, `INFO_ProjMang`, `.env`, `.gitignore`, `Doxfile`, `LICENSE`.

## Working with GitFlow Branches

GitFlow organizes project branches and releases efficiently. For usage instructions, refer to [INFO_ProjMang](INFO_PROJMANG.md).

## Setting Up Submodules

Submodules allow including microservice repositories within the main repository. Setup guidance is available in [INFO_ProjMang](INFO_PROJMANG.md).

## Environment Setup

Setup an Anaconda Environment as the Virtual Workspace Microservice Cluster Network Environment. Refer to [Python Microservice README](microservers/python-microserver/README.md) for detailed setup instructions.

## Cloud Setup

Configure the project for cloud environments following the steps in [Cloud Setup](INFO_CLOUD.md).

## Doxygen Documentation

Access and generate Doxygen documentation for each microservice with instructions in [INFO_Doc](INFO_DOC.md).

## Further Resources

- Project documentation and management: [INFO_Doc](INFO_DOC.md), [INFO_ProjMang](INFO_PROJMANG.md).
- Cloud management: [CLOUD_SETUP](INFO_CLOUD.md).

## Acknowledgements

Special thanks to Redis, Docker, OpenAI, and other open-source projects and tools that support this development.

## Installation

This proprietary package requires specific access rights for installation within TecArt Solutions' projects. [Installation steps](#installation).

## Contributing

This software is proprietary, owned by Rohit Wesley Thomas, and exclusively licensed to TecArt Solutions. Unauthorized use or distribution is prohibited.

## License

Copyright © 2024 Rohit Wesley Thomas and TecArt Solutions. All rights reserved. Unauthorized use, reproduction, or distribution is strictly prohibited and subject to legal action.

## Contact

For more information or support, contact [tecrtsolutions@gmail.com](mailto:tecrtsolutions@gmail.com).

---

[BACK TO TOP](#virtual-workspace-microservice-cluster)

---