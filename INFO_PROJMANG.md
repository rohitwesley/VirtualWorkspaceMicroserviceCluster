
---
| [BACK](README.md)

| [MICROCLUSTER](microservers/INFO.md)
| [MICROSERVICE](INFO_PROJMANG.md)
| [API](INFO_DOC.md)
| [CLOUD](INFO_CLOUD.md)
| [LICENSE](LICENSE.md)

# Virtual Workspace Project Mangement

---

*"This repository contains a collection of microservices that make up the Virtual Workspace Microservice Cluster. The project is organized as a set of submodules, each representing a microservice within the cluster."*

*"The repository uses the GitFlow branching model to manage the development process. In this document, you will find instructions on how to clone the repository, set up the project folder structure, work with GitFlow branches, and add Doxygen comments."*

---

## Setup Hub

The `hub` command-line tool is designed to make working with GitHub from your terminal easier and more efficient. It extends Git with GitHub-specific features, allowing you to do more without leaving the command line. Here are some key points to understand about using `hub`:

### Optional but Powerful

While `hub` offers powerful enhancements for your GitHub workflows, it's important to note that it is an *optional* tool. You can manage your projects on GitHub effectively using standard Git commands. `hub` is there to provide additional convenience and streamline tasks such as creating pull requests and managing repositories.

### Ideal for Command Line Enthusiasts

`hub` is particularly beneficial for those who prefer to work within the command line environment. If you find yourself frequently switching between the terminal and GitHub's web interface for tasks like opening new pull requests or checking out other people's pull requests locally, `hub` can save you time and streamline your workflow.

### Installing `hub`

- **Windows**:
  Download the [latest release](https://github.com/github/hub/releases) and add the `hub` executable to your system's PATH.

- **macOS**:
```
brew install hub
```

- **Linux (Debian/Ubuntu)**:
```
sudo apt-get install hub
```

### Using `hub` to Manage Repositories

`hub` can significantly streamline your GitHub workflow. Here are some of the benefits:

1. **Simplified GitHub Interaction**: Directly create, view, and fork repositories on GitHub from the command line.

2. **Enhanced Pull Requests and Issues Management**: Easily create pull requests and issues from the terminal, saving time for developers who frequently interact with GitHub.

3. **Repository Creation Example**: To create a new private repository on GitHub with a description, you can use the following `hub` command:

```
hub create -p -d "Virtual Workspace Microservice Cluster" VirtualWorkspaceMicroserviceCluster
```

This command creates a new private repository named "VirtualWorkspaceMicroserviceCluster" with the description "Virtual Workspace Microservice Cluster" on your GitHub account.

>### Note:
>
>While `hub` is not strictly necessary for managing Git repositories, it offers added convenience for GitHub users, making certain tasks more efficient. It's particularly useful for workflows that involve frequent interactions with GitHub, such as managing pull requests and issues or setting up new repositories.
---

## SSH Key Generation and Setup

Secure Shell (SSH) keys are a secure way of authenticating with GitHub when pushing and pulling from repositories. Before generating a new SSH key, it's essential to check if you already have an SSH key configured that you can use, which helps avoid creating unnecessary duplicates.

### Checking for Existing SSH Keys

`. **List SSH Keys**: Enter the following command to list all the SSH keys under the default SSH directory:
   ```bash
   ls -al ~/.ssh
   ```
This command lists all files in your ~/.ssh directory, if it exists. Look for files named either id_rsa.pub, id_ecdsa.pub, id_ed25519.pub, or similar. If you see such files, you already have an SSH key.

> **Verify Usage**: If you find an existing SSH key, consider whether you can use it for GitHub or need to generate a new one. Using an existing key can simplify your setup.

### Generating a New SSH Key

If you need to generate a new SSH key (for instance, if you don't have one or the existing one isn't suitable for GitHub), follow these steps:

1. **Generate Key**: Run the following command, replacing `your_email@example.com` with your GitHub email address:
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```
This will create a new SSH key pair using the Ed25519 algorithm. using the provided email as a label. 
>Follow the prompts to save the key pair and set a passphrase (optional).
>
>Follow the prompts to save the key pair and set a passphrase (optional).
>
>When prompted to "Enter a file in which to save the key," press Enter to accept the default location.

2. **Start the SSH Agent**: Before adding your new SSH key to the ssh-agent, ensure the ssh-agent is running:
```
eval "$(ssh-agent -s)"
```

3. **Add SSH Key to SSH Agent**: Add your SSH key to the ssh-agent:
```
ssh-add ~/.ssh/id_ed25519
```

### Add your SSH key to your GitHub account

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

>By following these steps, you'll be able to set up SSH, create the remote repository, and perform all the setup from the terminal.
---

## Setting Up Git Large File Storage (Git LFS)

Git Large File Storage (Git LFS) is an open-source extension for Git that allows you to manage large files with Git, without storing the file content in the Git repository. It's particularly useful for projects that include large files such as multimedia files, datasets, and graphics.

### Installing Git LFS

1. **Download Git LFS**: Go to the [Git LFS website](https://git-lfs.github.com) and download the Git LFS command line extension for your operating system.

2. **Install Git LFS**:
   - On macOS and Linux, you can typically install Git LFS using a package manager. For macOS, use Homebrew:
     ```
     brew install git-lfs
     ```
   - On Linux, use the respective package manager for your distribution, for example on Debian/Ubuntu:
     ```
     sudo apt-get install git-lfs
     ```
   - On Windows, after downloading, run the installer and follow the instructions.

### Configuring Git LFS for Your Repository

After installing Git LFS, you need to set it up in your repository to track large files. Here's how to do it:

1. **Initialize Git LFS**: Navigate to your repository directory in the terminal and run:
```
git lfs install
```

This command needs to be run once per repository to set up the necessary hooks in .git/hooks.

2. **Track Large Files**: Decide which file types you want to track with Git LFS. Then, use the `git lfs track` command to specify these file types. For example, to track all .psd files, run:
```
git lfs track "*.psd"
```
This command updates the `.gitattributes` file and ensures that all files matching the pattern are tracked by Git LFS.

3. **Commit Your Changes**: After tracking the desired file types, commit the `.gitattributes` file to your repository:
```
git add .gitattributes
git commit -m "Configure Git LFS"
```

### Using Git LFS

- **Working with Large Files**: Once Git LFS is set up, you can work with large files just as you would with any other files in your Git repository. When you push your changes, Git LFS files are transferred to the LFS storage, while the Git repository only contains references to these files.

- **Cloning and Pulling LFS Files**: When cloning or pulling from a repository with LFS files, Git LFS automatically downloads the large files as needed.

>### Note:
>
>Git LFS is a powerful tool for managing large files in Git repositories. By following these setup steps, you can efficiently manage large files without compromising the performance of your Git repository.

---

## Setting Up Git Flow

Git Flow is a workflow model that extends Git with a set of commands to streamline the development process, making it easier to manage features, releases, and hotfixes. It's especially useful for projects that follow a branching model based on feature development, releases, and maintenance.

### Installing Git Flow

The installation process varies depending on your operating system:

- **macOS**:
  Git Flow can be installed using Homebrew with the following command:
```
brew install git-flow-avh
```

- **Windows**:
For Windows users, Git Flow can be installed as part of Git for Windows or via Cygwin. If you're using Git for Windows, you can use Git Bash to execute Git Flow commands.

- **Linux (Debian/Ubuntu)**:
Use the following command to install Git Flow:
```
sudo apt-get install git-flow
```

>### Note:
>
>Git Flow is a powerful tool that can help manage the development process, making it easier to handle different types of changes in your project. By following these steps to install and initialize Git Flow, you're setting up a structured workflow that can enhance team collaboration and streamline the release process.


---

## Setup Project Folder Structure

### Prerequisites
- Git
- Doxygen (optional, for generating documentation)

### 1. Clone the repository using the SSH URL:

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
### 3. Sync submodules
Change the submodule URLs in your parent repository:
Navigate to the parent repository (VirtualWorkspaceMicroserviceCluster) in your command line.
Open the .gitmodules file in a text editor.
Find the entries for the VirtualWorkspaceDashboardMicroservice and VirtualWorkspaceUnityMicroservice submodules and remove the "-" from the end of the URL.
Save and close the .gitmodules file.
Run the following command to sync the changes in the .gitmodules file to Git:
```
git submodule sync
```
---
### 4. Update submodules
Update all submodules to fetch the latest changes:
```
git submodule update --init --recursive
```
---
## Working with GitFlow branches
The repository is organized using the GitFlow workflow. The main branches are master and develop. Use feature, release, and hotfix branches as needed.

>**Feature branches**
>
>To work on a new feature, create a feature branch:
>```
>git flow feature start my-feature
>```
>Once the feature is complete, finish the feature branch:
>```
>git flow feature finish my-feature
>```
>---
>**Release branches**
>
>To prepare a new release, create a release branch:
>```
>git flow release start my-release
>```
>After the release is ready, finish the release branch:
>```
>git flow release finish my-release
>```
>---
>**Hotfix branches**
>
>To apply a hotfix, create a hotfix branch:
>```
>git flow hotfix start my-hotfix
>```
>Once the hotfix is complete, finish the hotfix branch:
>```
>git flow hotfix finish my-hotfix
>```
>---

### 1. Create dummy commits for all GitFlow branches:
In **Windows**, you can create an empty file using the `type nul >` command. This is equivalent to the `touch` command in Unix-based systems. To create an empty file called `example.txt`, open the Command Prompt and run:
```
type nul > example.txt
```
If the file already exists, this command will not modify the file's contents or update its timestamp. If the file does not exist, it will be created as an empty file.

Alternatively, you can use PowerShell to create an empty file with the `New-Item` command:
```
New-Item -ItemType File -Path example.txt -Force
```
This command will create an empty `example.txt` file or overwrite the existing file if it exists. Remove the `-Force` flag if you want to keep the existing file unchanged.


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
### 2. Create a README.md file to explain the setup:
```
touch README.md
```
Edit the README.md file to provide information about the "Virtual Workspace Microservice Cluster" repository, its modules, and how to set up and use the project. Save the file and commit it:
```
git add README.md
git commit -m "Add README.md with setup instructions"
```
### 3. Push the changes to the remote repository:
```
git push --all
git push --tags
```
Now, you have combined your private repos into the "Virtual Workspace Microservice Cluster" repository, organized as modules with dummy commits for all GitFlow branches, and added a README.md file with setup instructions.

## Setting up submodules

### Adding submodules
* Research modules for testing go in research-microservices as a feature
  >Use the SSH URL for the submodule
  ```
  git submodule add git@github.com:your-username/microservice-private-repo.git research-microservers/research-microservices-private-repo
  ```
* Live modules go into microservices as a feature
  ```
  git submodule add git@github.com:your-username/microservice-private-repo.git microservers/microservices-private-repo
  ```
### Update submodules
  * If you have changed the URL of a submodule, you also need to update the local configuration for that submodule:
  ```
  git submodule sync
  ```
  * Update all submodules to fetch the latest changes:
  ```
  git submodule update --init --recursive
  ```
###  Commit the submodule:
```
git add `.gitmodules` research-microservers/research-microservices-private-repo
git commit -m "Add research-microservices-private-repo as submodule"
```
```
git add `.gitmodules` microservers/microservice-microservice
git commit -m "Add microservices-private-repo as submodule"
```
### Delete submodule:
To delete a Git submodule, follow these steps:

1. Remove the submodule entry from the `.gitmodules` file:

Open the `.gitmodules` file in your project's root directory and remove the section corresponding to the submodule you want to delete. The section should look like this:
```
[submodule "submodule_name"]
    path = path/to/submodule
    url = https://github.com/user/repo.git
```
Save and close the file after removing the section.

2. Remove the submodule entry from the `.git/config` file:

Open the `.git/config` file in your project's root directory and remove the corresponding submodule section, which should look like this:
```
[submodule "submodule_name"]
    url = https://github.com/user/repo.git
```
Save and close the file after removing the section.

3. Stage the changes:

In your terminal, run the following command to stage the changes to the `.gitmodules` file:
```
git add `.gitmodules`
```
4. Remove the submodule files from the Git index:

Run the following command to remove the submodule files from the Git index:
```
git rm --cached path/to/submodule
```
Replace `path/to/submodule` with the actual path to the submodule directory.

5. Commit the changes:

Run the following commands to commit the changes:
```
git commit -m "Removed submodule"
```
6. Delete the submodule directory:

Finally, delete the submodule directory using your file manager or a command:

>Clean using Git:
>```
>path\to\submodule\ git clean -dxf 
>```
>**WARNING :** *this will clear all untracked data includind unlinked submodule 

>For Windows:
>```
>rmdir /s /q path\to\submodule
>```
>For macOS and Linux:
>```
>rm -rf path/to/submodule
>```
>Replace `path/to/submodule` with the actual path to the submodule directory.

After completing these steps, the submodule should be completely removed from your Git repository.
### Rename submodule folder:
```
git mv research-microservers/microservice-template research-microservers/VirtualWorkspaceMicroservice
```
### Change a local folder into a submodule

To reset a submodule we need to do the following:
1. Check if there is any existing file or directory at the specified path:
```
ls -la Doxygen/custom_theme/doxygen-bootstrapped
```
2. If there is a file or directory at the specified path, remove or move it to a different location. Make sure to back up any important data before removing the file or directory. You can remove it using the following command:
```
rm -r Doxygen/custom_theme/doxygen-bootstrapped
```
3. After removing the file or directory, remove the entry from the Git index as well:
```
git rm --cached Doxygen/custom_theme/doxygen-bootstrapped
```
4. Now you should be able to add the submodule without any issues:
```
git submodule add git@github.com:Velron/doxygen-bootstrapped.git Doxygen/custom_theme/doxygen-bootstrapped
```
This command will add the submodule to the specified path and create a `.gitmodules` file that contains the submodule information.

2. Reuse the local Git repository by adding the submodule using the `--force` option if you're sure the local Git repository is the correct one:
```
git submodule add --force git@github.com:Velron/doxygen-bootstrapped.git Doxygen/custom_theme/doxygen-bootstrapped
```
>`--force`: This option will reuse the existing local Git repository instead of cloning the remote repository. This can save time and bandwidth if the local repository is up to date and you're sure it's the correct one. Be cautious when using this option, as it can cause inconsistencies if the local repository is not in sync with the remote one.
3. Choose another name for the submodule using the `--name` option if the local repository is not the correct one or if you're unsure about its purpose.
Before proceeding, it's important to understand the implications of both options:
```
git submodule add --name new_submodule_name git@github.com:Velron/doxygen-bootstrapped.git Doxygen/custom_theme/doxygen-bootstrapped
```
>`--name`: This option allows you to specify a different name for the submodule. This can be useful if you want to avoid conflicts with existing local repositories, but it requires you to update the submodule path in your project's configuration files.
Replace `new_submodule_name` with the desired name for your submodule.
---
## Project tags
When you execute the command `git tag -a dummy-release`, Git will open your default text editor, which in your case is Vim, to input the tag message (similar to a commit message).

In Vim, follow these steps to add a tag message and save the changes:

1. Press `i` to enter insert mode. This allows you to edit the file and input your tag message.

2. Type your tag message, such as "Dummy release for GitFlow setup."

3. Press the `Esc` key to exit insert mode.

4. To save the changes and exit Vim, type `:wq` and press Enter. The colon : enters command-line mode in Vim, `w` stands for "write" (save), and q stands for "quit" (exit).

If you want to discard your changes and exit without saving, type `:q!` and press `Enter`.

Now, your `dummy-release` tag will be created with the specified message. To view the tag message, run `git show dummy-release`.

### Recover Deleted Branch:

If you accidentally deleted a branch using `git branch -d feature/dummy-feature` or `git branch -D feature/dummy-feature`, you can undo the deletion by finding the last commit on the deleted branch and creating a new branch pointing to that commit.

Follow these steps to recover the deleted branch:

1. Find the last commit on the deleted branch using the git reflog command:
```
git reflog
```
Look for an entry in the reflog that refers to the deleted branch, for example:
```
d123456 HEAD@{1}: checkout: moving from feature/dummy-feature to main
```
In this case, `d123456` is the commit hash of the last commit on the deleted branch.

2. Create a new branch pointing to the last commit on the deleted branch:
```
git checkout -b feature/dummy-feature d123456
```
Replace `d123456` with the actual commit hash you found in step 1.

Now, you have successfully recovered the deleted branch, and it is pointing to the last commit before the deletion. If you made any changes to the branch after the last commit, those changes may be lost, and you'll need to reapply them manually.
## Append Commit

To append changes to your most recent commit without changing the commit message, you can use the `--amend` option with the `--no-edit` flag in Git. Here is the command:
```
git add .
git commit --amend --no-edit
```
> Explanation:
>
>1. `git add .` - This command stages all the changes you made. Replace the `.` with the specific file or files you want to add if you don't want to stage all changes.
>
>2. `git commit --amend --no-edit` - This command alters the most recent commit with the new changes you just staged. The `--no-edit` flag tells Git to keep the current commit message.
>
Remember to be careful when amending commits that have already been pushed to a remote repository, as this can cause issues for other people working in the same repository. If you've already pushed your commit to a remote repository, you'll need to force push with `git push origin <branch> --force` after amending the commit. However, you should generally avoid force pushing whenever possible.
## Reset Branch
To revert your local branch to the state of the remote branch, follow these steps:

1. Make sure you have the latest version of the remote branch in your local repository. To do this, fetch the remote updates:
```
git fetch origin
```
Replace `origin` with the name of your remote if it's different. This command fetches the latest changes from the remote repository without modifying your local branches.

2. Assuming you want to revert your local branch to the remote branch with the same name, you can use `git reset` with the `--hard` flag. This command resets your local branch to the specified commit and discards any local changes:
```
git reset --hard origin/branch_name
```
Replace `origin/branch_name` with the remote branch you want to revert your local branch to. For example, if your remote is named origin and the branch is named main, you would use `git reset --hard origin/main`.

>**Warning**: The `--hard` flag will discard any local changes in your working directory and reset the index. If you have any uncommitted changes, they will be lost. Make sure to commit or stash any important changes before running this command.

After running the `git reset --hard` command, your local branch will be reverted to the state of the remote branch, discarding any local changes or commits made since the last synchronization with the remote branch.
## Project `.gitignore`

A `.gitignore` file specifies intentionally untracked files that Git should ignore. It helps prevent accidentally committing unnecessary files to the repository. Here's a basic `.gitignore` file that you can use for your "Visual Workspace Microserver Cluster" project. It includes common files and directories that are often ignored in software projects:
```
# .gitignore

# Ignore system files
.DS_Store
Thumbs.db

# Ignore files related to code editors and IDEs
.vscode/
.idea/
*.iml
*.swp
*.swo

# Ignore compiled files and build artifacts
*.o
*.lo
*.la
*.so
*.dylib
*.dll
*.exe
*.out

# Ignore log files
*.log

# Ignore temporary files
*.tmp
*.temp
*.bak

# Ignore Node.js dependencies
node_modules/

# Ignore Python build and cache files
__pycache__/
*.pyc
*.pyo
*.egg-info/
dist/
build/

# Ignore Ruby gems
*.gem
*.rbc
/.config
/coverage/
/InstalledFiles
/pkg/
/spec/reports/
/spec/examples.txt
/test/tmp/
/tmp/

# Ignore Java build files
*.class
*.jar
*.war
*.ear
*.zip
*.tar.gz
*.rar

# Ignore generated files and directories
bin/
gen/
out/

```
>Create a file named `.gitignore` in the root directory of your repository and paste the contents above into the file. This will help prevent unnecessary files from being tracked by Git. You can customize this file to fit the specific needs of your project and its components.

---
## Enable Long Path on Windows
It seems you are encountering an issue with the maximum filename length on Windows. Git on Windows has a limit of 260 characters for file paths, and some files in the repository you are trying to clone as a submodule have paths longer than that.

To resolve this issue, you can try the following steps:

1. Enable long paths on Windows:
* Press `Win` + `R` to open the Run dialog.
* Type `gpedit.msc` and press Enter to open the Local Group Policy Editor.
* Navigate to `Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem`.
* Find the `Enable Win32 long paths` setting, double-click on it, and set it to `Enabled`.
* Click `Apply` and then `OK`.
* Restart your computer for the changes to take effect.
2. Configure Git to allow long paths:
* Open the Git Bash or Command Prompt.
* Run the following command:
```
git config --global core.longpaths true
```
After completing these steps, try adding the submodule again. If you still encounter issues, consider moving your project to a shorter directory path to further reduce the total path length of the files.

---

[END OF PAGE]

[BACK](README.md)

---