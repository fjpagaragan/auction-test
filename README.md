# Autcion Test
A technical test project for certain company

## Tech Stack

**_FRONTEND_**

- ReactJS
- NextJS
- Typescript
- RxJs
- Redux
- Chakra UI

**_BACKEND_**

- NodeJs
- Express
- Sequelize (ORM)

## Getting Started

### Prerequisites

- [GIT](https://git-scm.com/)
- [NodeJs](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/desktop/install/mac-install/)

Run the following Git commands to set up your user credentials on the configuration:

```bash
 git config --global user.email "email@email.com"
 git config --global user.name "Your Name"
```

For the sake of better organization it is recommended you keep all the code in a single workspace directory. We’ll assume it is ~/Workspace

```bash
cd ~
mkdir Workspace
```

### Clone repository

First you need to setup ssh in github

1.  See [Github SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) for detailed instruction
4.  Then clone with ssh

```bash
cd ~/Workspace
git clone git@github.com:fjpagaragan/auction-test.git
cd auction-test
```

### Installation

**FRONTEND**

Go to /auction-test project folder

```bash
  cd frontend
  npm i
```

**BACKEND**

Go to /auction-test project folder

```bash
 cd backend
 npm i
```

**DOCKER**

Go to /auction-test project folder.

```bash
 docker-compose up
```

> Verify it in Docker application

- Click Containers/Apps
- You should see that frontend, backend and postgres are running
- The application will be up and running in http://localhost:3000.


## Contact

Francis Pagaragan - [Linkedin](https://www.linkedin.com/in/francis-jerome-pagaragan-425522148/) - fjpagaragan@gmail.com

Project Link: [https://github.com/fjpagaragan/auction-test](https://github.com/fjpagaragan/auction-test)

