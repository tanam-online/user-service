# Tanam User Service

API is documented at Swagger [app.swaggerhub.com/apis-docs/isfanr/Tanam](https://app.swaggerhub.com/apis-docs/isfanr/Tanam/1.0.0).<br />

API is accessible on [api-user-tanam.herokuapp.com](https://api-user-tanam.herokuapp.com).<br />

This project was bootstrapped with [Express Generator](https://expressjs.com/en/starter/generator.html).

## Endpoints List

``` bash
[GET] '/' = Check if API is live
[POST] '/login' = For login purpose
[POST] '/recover' = Generate link for password recovery
[POST] '/change-password/:encId' = Change password endpoint
[GET] '/users' = Get all users
[GET] '/users/:id' = Get user by id
[POST] '/users' = Create new user
[PUT] '/users/:id' = Edit user by id
[DELETE] '/users/:id' = Delete user by id
*Make sure you have valid or real email for periodic report email purposes (in report-service)
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Install required dependencies.

### `npm start`

Runs the app in the development mode.<br />
API will run on [http://localhost:5000](http://localhost:5000).

### `npm run dev`

Runs the app in the development mode with hot reload.<br />
API will run on [http://localhost:5000](http://localhost:5000).

### `npm run lint`

Checks if there is any warning or wrong in codes lint.

### `npm run lint-fix`

Checks if there is any warning or wrong in codes lint.<br />
And automatically fixes what can be fixed.

## Learn More

You can learn more in the [Express documentation](https://expressjs.com/).