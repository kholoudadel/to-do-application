## To-Do App
This is a To-Do app that allows users to create, read, update and delete their To-Dos

### Getting Started
To use this app, you will need to have Node js and npm installed on your machine

1. Clone the repository to your local machine
2. Run npm install in server folder to install the required dependencies 
3. change your environment variables in .env
4. Start the app by running npm start

### Usage

The To-Do app provides users with the following functionalities:
- POST /register: Endpoint for user registration.
- POST /login: Endpoint for user login.
- POST /logout: Endpoint for user logout.
- GET /todos: Endpoint for retrieving all "todo" resources.
- POST /todos: Endpoint for creating a new "todo" resource.
- PUT /todos/id Endpoint for updating an existing "todo" resource.
- DELETE /todos/id Endpoint for deleting an existing "todo" resource.