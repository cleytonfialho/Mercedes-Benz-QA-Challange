# Mercedes Benz Challage - Cleyton

## Prerequisites

These are required to successfuly execute the project:

* Any code editor
* [Node.js](https://nodejs.org/en/download)
* [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

**Optional**
* [Docker](https://rancherdesktop.io/) - If you want to execute tests locally using Docker is required to have docker installed (it can be Rancher Desktop, Docker Desktop or any that you want).

## Instalation Steps
A step by step guide to get the development environment up and running

Clone the repository
```bash 
git clone git@github.com:cleytonfialho/Mercedes-Benz-Challange.git
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

The Playwright is configured to run in the headless mode, so no browser will be visible. In case you want to see the browser, change the configuration on playwright.congif.ts > headless: false

### Executing Tests with Docker

If you want to execute the tests inside a docker container, you must first login in Docker with following command:

```bash 
docker login
```
After loged in you can execute the tests inside a container running the command below:

```bash 
yarn test:ci
```


### Pipeline

The pipeline to execute the tests uses the Jenkinsfile located at .pipeline/ci.
