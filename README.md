# Argument-Diagram
Welcome to Argument-Diagram! This project is an interactive visual tool used to help diagram arguments.

It is hosted on https://argument-diagram.bram-hub.com.

# Developer Installation Guide
To get started contributing, please follow the following steps

## Install Git
Most MacOS devices come with Git already installed. You can check by opening Terminal and running `git --version`.
1. If you would like a graphical interface, install the [GitHub Desktop](https://desktop.github.com/) client for Mac/Windows.
2. If using WSL, run `sudo apt-get install git`
3. If you don't have Git installed, download and run the [installer](https://git-scm.com/downloads)
* _NOTE_: You can accept most default settings, be sure to add git to PATH if asked
* You will also need to authenticate your terminal with a personal access token. Please visit the [GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) for more details.

## Install Node.js/npm
If using WSL, run 
```
sudo apt-get install nodejs
sudo apt-get install npm
```

Otherwise, download the [Node.js installer](https://nodejs.org/en/download/current/)

This should install both `node` and `npm`. You can check by running `node --version` and `npm --version` and making sure
you don't recieve an error.

## Clone Repository
1. Open your terminal/command prompt and navigate to the folder that you want to contain the repo
2. Run `git clone https://github.com/joekrystowski/Argument-Diagram.git` to clone the repo
3. Change directory into the newly made project folder `cd Argument-Diagram`
4. Install dependencies with `npm install`

## Running Local Node Server
1. Navigate to the project repo in your terminal `cd path/to/project` (Windows uses `\` instead of `/`)
2. Run `npm start` _Make sure you keep this process running otherwise you won't be able to use the site/view changes_
3. Visit `http://localhost:8000`
4. Compile new changes to Typescript and SASS with `npm run build`, or (Ctrl/Cmd)+Shift+B and Enter in Visual Studio Code

__You should never directly edit `.js` and `.css` files as those changes will be overwritten upon compiling.__

Any changes you make to the project will automatically be detected and updated within a few seconds.

## Making Changes
The main branch of the repository is locked, meaning you must push changes on a separate branch.

The main workflow is as follows:
1. Checkout main branch `git checkout main`
2. Pull any recent changes from remote `git pull`
3. Make a new branch for what you will be working on `git checkout -b your-branch-name-here`
4. Make changes (don't forget to compile)
5. Check all the modified files are things you meant to change `git status`
6. Track all changes `git add .`
7. Make a commit `git commit -m "message describing changes"`
8. Push branch to remote `git push origin your-branch-name-here`
9. Go to https://github.com/joekrystowski/Argument-Diagram/ and make a pull request on your branch
10. Someone else Review & merge pull request

# Joint.js
This project is built on the open source Joint.js library -> https://resources.jointjs.com/docs/jointjs/v3.3/joint.html
