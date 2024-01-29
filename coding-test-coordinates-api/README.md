# Coding Test - Coordinates API

## Introduction
Welcome to our coding test! In this challenge, you'll work with a simple Koa-based API. Your task is to add functionality to this existing API, showcasing your skills in JavaScript and API development.

### Provided Starter Code
You will begin with a basic Hello World API built using Koa and Koa-router. The codebase includes the following:
- A primary endpoint: `/health`
- A `package.json` file outlining dependencies and scripts
- An `.nvmrc` file specifying the required Node.js version

### Getting Started
To set up the project:
1. **Node Version**: Ensure you're using the correct version of Node.js as specified in the `.nvmrc` file. You can use [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) to switch to the required version.
2. **Package Management**: This project uses Yarn. Run `yarn install` to install the necessary dependencies.
3. **Starting the API**: Execute `yarn start` to launch the API. It will be served at `http://localhost:3000`.
4. **Verifying Setup**: Access `http://localhost:3000/health` in your browser or API tool to check if the API is running correctly.

## Assignment

### Task Overview
Your assignment is to add two new endpoints to the API: `/robot/start` and `/robot/end/:difficulty`.

#### Endpoint 1: `/robot/start`
- **Functionality**: This endpoint should return JSON-formatted coordinates.
- **Requirements**:
  - `x`: A random integer between 0 and 15.
  - `y`: A random integer between -15 and 15, only including values divisible by 3.
  - `direction`: A random direction (`NORTH`, `EAST`, `SOUTH`, `WEST`). `NORTH` should have a 70% chance of being selected, while the other directions should each have a 10% chance.

#### Endpoint 2: `/robot/end/:difficulty`
- **Functionality**: This endpoint accepts a `difficulty` parameter (ranging from 1 to 4) and returns coordinates based on the specified difficulty.
- **Output**:
  - Difficulty 1: `{x: 1, y: 1}`
  - Difficulty 2: `{x: 4, y: 4}`
  - Difficulty 3: `{x: 9, y: 9}`
  - Difficulty 4: `{x: 16, y: 16}`

## Tests

### JavaScript Testing with Jest
We use Jest for testing our JavaScript code. To run the tests, use the following command:

```bash
yarn test
