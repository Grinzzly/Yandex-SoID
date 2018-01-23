<h1 align="center">Task #1 | Integrated Task</h1>

<div align="center">
  <sub>The little task that could. Solved by
  <a href="https://github.com/Grinzzly">Grinzzly</a>
  </a>
  <br>
  <br>
  <a href="https://github.com/airbnb/javascript">
        <img src="https://img.shields.io/badge/Code%20Style-Airbnb-red.svg" alt="Airbnb">
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/60%25%20of%20the%20time-works%20every%20time-blue.svg" alt="Quality">
</div>

# Usage

## Installation

```
npm i
npm run dev
```

For DB data reset:
```
npm run reset-db
```

##Tests

```
npm run test
```

# Solution

## As a result of task completion:
* Absolute path misspelling edited `/graphgl` -> `/graphql` `(./index.js)`
* Add missing argument to `Sequelize` class constructor`./modules/index.js`
* `Event` class methods missing `return` statement `(./graphql/resolvers/index.js)`
* `UserRoom` redundant schema removed, looks like a legacy parts `(./graphql/typeDefs.js)`
* `resolver` method added `addUserToEvent` according to schema (`./graphql/resolvers/mutation.js`)
* `codestyle` changes according to [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript)
* [Pug](https://pugjs.org/api/getting-started.html) usage implemented
* GraphQL-express changed to [apollo-server-express](https://www.apollographql.com/). Due to the fact that apollo-server being preference of GraphQL
* Module tests added by usage of [Jest](https://facebook.github.io/jest/)

## Technology in use
* Node.js
* GraphQL
* Apollo Server Express
* SQLite 
* Sequelize


### [Go Back](https://github.com/Grinzzly/Yandex-SoID)



