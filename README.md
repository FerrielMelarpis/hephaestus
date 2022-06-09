# Hephaestus

A simple CRUD app for tracking bots.

## Description

This project is created with [Nest](https://github.com/nestjs/nest) framework TypeScript template.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Run docker container for the database.
$ docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# Make sure you've run the container for the database.
# The docker-compose file contains a db service for testing as well so you only need to run this once for dev and testing.
$ docker-compose up -d

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT license](LICENSE).
