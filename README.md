# spam-reporting-app

A simple full stack reporting system for admins to resolve and block spam;

### Features!
- Admin can block or resolve spam reports.

### Development
This API has been created using Nodejs environment and implementing Express as the routing framework and Mongodb as the database 
The Client has been built with React as the frontend framework and Semantic UI as the CSS Framework.

### Prerequisites
Nodejs
Mongo
Postman

### Configure Environment
Copy the .env.example file and rename it inot .env.sample Edit your .env with the required values

```
MONGO_URI=Your database URL
```

### Installation
App requires you have [Node.js](https://nodejs.org/) v15.10.0 Check your node version by typing `node -v`

```sh
$ clone repository
$ cd <into folder>
$ npm install
$ cd client
$ npm install
```

### Running the Application


### Exposed Endpoints

| VERB | URL | ACTION |
| ------ | ------ | ------ |
| GET | /api/v1/reports | Lists All Reports |
| PUT | /api/v1/report/:reportId | Updates a Report |


### Future Improvements
 - Write MORE Tests
 - Improve UI

License
----

MIT