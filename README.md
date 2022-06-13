# Hephaestus

A simple CRUD app for tracking bots.

## Description

This project is created with [Nest](https://github.com/nestjs/nest) framework TypeScript template.

At the time of writing, the documentations for TypeORM is outdated with the latest version. I chose to use Prisma as well instead of TypeORM as I think it's a better option for several reasons.

1. Better typing.

- Prisma generates a client code which abstracts most of the common ORM methods that you would expect when writing a repository for an entity.

2. Schema is separated from actual codebase.

- The reason why I prefer this is that the .prisma file offers a syntax that is much easier to understand and reason out when describing a database schema.

3. Easier migration handling.

- You can just quickly design an initial schema, update it or override it when developing instead of generating new migration files on every update/mistake you make on the schema.

4. Documentation

- Much better documentation that TypeORM really.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Run docker container for the database.
$ docker-compose up -d

# Run migrations
$ npm run migrate

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

## migrations are needed for test db
## make sure to run them before running e2e tests
$ npm run migrate:test # run migrations for test first

## run e2e test suites
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Authentication and Authorization
- The app has basic Github Oauth2 + JWT strategy authentication and authorization process.
- To access the app, go to http://127.0.0.1:3000/auth/github/. This will redirect you to Github.com and you will need to authorize the app to get some public info from you.
- Once the app is authorized, it should redirect you to http://127.0.0.1:3000/bots/ page.

## License

[MIT license](LICENSE).
