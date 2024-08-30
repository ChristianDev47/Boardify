# Boardify API

Boardify is a full-stack project management API inspired by Trello, built using Node.js and Express. It features a robust set of functionalities to manage projects effectively, with a focus on scalability and maintainability. The API leverages MongoDB as its database and follows the MVC (Model-View-Controller) architecture to ensure clear and organized code.

## Core Features

Boardify provides a comprehensive set of CRUD operations (Create, Read, Update, Delete) for managing the following entities within the system:

- **Users**: Manage user profiles, authentication, and authorization.
- **Boards**: Create and manage boards, including permissions and backgrounds.
- **Lists**: Organize tasks within boards.
- **Cards**: Handle individual tasks or items within lists.
- **CheckItems**: Manage checklist items within cards.
- **Activities**: Track activities related to boards, lists, and cards.
- **Labels**: Manage labels associated with cards.
- **Files**: Handle file uploads related to cards, boards, and user profiles.
- **Invitations**: Manage board invitations for users.

### Additional Features

- **User Authentication**: Secure login and logout functionality with JSON Web Token (JWT) for session management.
- **Role-Based Access Control**: Implement token-based authentication and role-based permissions.
- **File Uploads**: Handle file uploads with Multer and Cloudinary for image storage and management.
- **API Documentation**: Detailed API documentation generated automatically using Swagger UI.
- **Testing**: Automated tests using Jest and Supertest to ensure the API's reliability.
- **Dockerization**: Dockerized application for consistent development and production environments.

## Technologies Used

- **Node.js**: Core platform for running the server.
- **Express**: Framework used for building the API.
- **Bcrypt**: Utilized for secure password encryption.
- **JsonWebToken (JWT)**: Manages authentication and permissions via JWT tokens.
- **Cloudinary**: Storage and management of images.
- **Multer**: Middleware for handling file uploads.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Swagger UI**: Tool for creating interactive API documentation.
- **Zod**: Library for data validation.
- **Jest**: Testing framework used for unit and integration tests.
- **Supertest**: Tool for HTTP testing of the API.
- **Docker**: Containerization of the application to ensure a consistent environment in both development and production.
- **Nodemon**: Tool for automatic server reload during development.
- **dotenv**: Manages environment variables.


## DB Diagram
Here is the diagram of the DataBase

![ER-Diagram](https://raw.githubusercontent.com/ChristianDev47/Boardify/refs/heads/master/Backend/src/models/database/diagram/ER_Diagram.png)

