# Mercedes Benz Challange - Cleyton

- TASK 1 -> `Bug Report - TASK1.pdf`
- TASK 2 -> `/src/tests/ShopUsed.test.spec.ts`
- TASK 3 -> `.pipeline/ci/Jenkinsfile`
    
## Prerequisites

These are required to successfuly execute the project:

* Any code editor
* [Node.js](https://nodejs.org/en/download)
* [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

**Optional**
* [Docker](https://rancherdesktop.io/) - If you want to execute tests locally using Docker or in Jenkins is required to have docker installed (it can be Rancher Desktop, Docker Desktop or any that you want).

## Instalation Steps
A step by step guide to get the development environment up and running

Clone the repository
```bash 
git clone git@github.com:cleytonfialho/Mercedes-Benz-QA-Challange.git
```

Install the project dependencies

```bash 
yarn | npm install
```

Install the Playwright Browser

```bash 
yarn playwright install
```

## Executing Tests

To execute the tests you can use the following command:

```bash 
yarn test
```

The Playwright is configured to run in the headless mode, so no browser will be visible. In case you want to see the browser, run the command with the flag --headed

```bash 
yarn test --headed
```

You can use the Playwright capitilities to execute the tests, for example: 
```bash 
yarn test --project=webkit #Execute tests for Webkit browser
```

### Executing Tests with Docker

If you want to execute the tests inside a docker container, you must first login in Docker with following command:

```bash 
docker login
```
After you make log in you can execute the tests inside a container running the command below:

```bash 
yarn test:ci
```

### Pipeline

The project is capable to execute a pipeline on Jenkins using the Jenkinsfile, however if you want to run it locally on Jenkins follow the steps:

Make sure you have Docker installed.

Make docker login in order to download Jenkins Image

```bash 
docker login
```

Change the ```docker-compose.yml``` file to point Jenkins HOME to your folder. 

Execute the command to start Jenkins

```bash 
docker compose up jenkins
```

It will be required to do the initial setup on Jenkins (install plugins, create your own user, etc). Once you have Jenkins setup you can create a new pipeline project.

1. New Item > [Enter a name for the project] > Select type Pipeline.
2. On Pipeline Definition select "Pipeline script from SCM".
3. Select Git as SCM. 
4. Enter the repository URL ```git@github.com:cleytonfialho/Mercedes-Benz-QA-Challange.git```
5. Select or Add a new credential for GitHub (It can be SSH Key or user/password)
6. Specify branch as main
7. Select Git executable
8. Enter Script path as .pipeline/ci/Jenkinsfile
9. Save the project and run !
