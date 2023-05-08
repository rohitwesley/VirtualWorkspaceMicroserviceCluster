# Virtual Workspace Microservice Cluster

---

*"This repository contains a collection of microservices that make up the Virtual Workspace Microservice Cluster. The project is organized as a set of submodules, each representing a microservice within the cluster."*

*"The repository uses the GitFlow branching model to manage the development process. In this document, you will find instructions on how to clone the repository, set up the project folder structure, work with GitFlow branches, and add Doxygen comments."*

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
### 3. Update submodules
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