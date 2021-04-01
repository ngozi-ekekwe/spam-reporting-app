# spam-reporting-app

A simple full stack reporting system for spam protection team to resolve and block spam;

### Features!
- Team members can block or resolve spam reports.

### Development
- This API has been created using Node.js environment and implementing Express as the routing framework 
- MongoDB as the database 
- The client has been built with React as the frontend framework and Semantic UI as the CSS Framework.

### Prerequisites
- Node.js
- MongoDB
- Postman

### Configure Environment
Copy the .env.example file and rename it inot .env.sample Edit your .env with the required values

```
MONGO_URI=mongodb://host:port/db_name
```

### Installation
App requires you have [Node.js](https://nodejs.org/) v14.16.0 Check your node version by typing `node -v`

```sh
$ clone repository
$ cd <into folder>
$ npm install

$ cd client
$ npm install
```

### Running the Application (in development)

Ensure you have mongoDB running and MONGO_URI is set

#### Start Server
```
  $ npm run start-dev
```

#### Start Client
- Change directory to client and start client
```
  $ cd client 
  $ npm run start
```


#### run test
```
  $ npm test
```

### Exposed Endpoints

| VERB | URL | ACTION |
| ------ | ------ | ------ |
| GET | /api/v1/reports | Lists All Reports |
| PUT | /api/v1/reports/:reportId | Updates a Report |
  GET | /health | Check health status of API |


### Future Improvements
 - Write MORE Tests
 - Improve UI
 - Improve code structure

License
----

MIT