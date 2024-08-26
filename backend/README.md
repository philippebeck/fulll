# Vehicle Fleet Parking Management

I have a vehicle fleet & I want to manage where every vehicle is parked  

## Getting started

### Requirements

To run this project, you need a computer with Node installed  

### Installation

With your terminal :

1. Clone the repository:  
  `$ git clone https://github.com/philippebeck/fulll-tests`  

2. Go to backend folder:  
`$ cd fulll-tests/backend`  

3. Install dependencies:  
`$ npm i`  

### Commands

With your terminal *(from the `backend` folder)*, type the following commands:  

1. **Create user**:  
  `$ ./fleet create-user` *(returns userId)*  

2. **Create fleet**:  
  `$ ./fleet create <userId>` *(returns fleetId)*  

3. **Register vehicle**:  
  `$ ./fleet register-vehicle <fleetId> <vehiclePlateNumber>`  

4. **Localize vehicle**:  
  `$ ./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lng lat [alt]`  

### Running tests

With your terminal, go to `backend` folder & run:  
  `$ yarn test`  

## Database

### Creation

The database is automatically created when you launch a command on your terminal  
It will create a `data.db` file in the backend directory  

### Cleaning

- To clean the database, simply delete the `data.db` file  
- Or use the following command: `$ rm data.db`

## Code quality & maintainability

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5b1ae06834dc4e96b4cd4764fc738a85)](https://app.codacy.com/gh/philippebeck/fulll-tests/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/1212b3e47fbe12b002dd/maintainability)](https://codeclimate.com/github/philippebeck/fulll-tests/maintainability)

## Project structure

```
backend
├── fleet               # command shell script
├── features            # all tests
└── src
    ├── App
    |   ├── Commands    # all commands
    |   └── Queries     # all queries
    ├── Domain
    |   ├── Entities    # all entities
    |   └── Interfaces  # all interfaces
    ├── Infra
    |   ├── Models      # all models
    |   └── index.ts    # db management
    └── app.ts          # cli main command
```
