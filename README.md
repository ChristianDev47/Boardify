# Boardify Fullstack Project Management Application

Boardify is a fully self-designed and implemented full-stack application tailored for effective project management and collaboration. Inspired by Trello, Boardify combines a sophisticated backend with a responsive and dynamic frontend, delivering a seamless user experience for managing projects, boards, lists, and cards.

## Project Overview

Boardify consists of two primary components:

1. **Backend - Boardify API**:
   - Built with Node.js and Express, this API manages all the server-side operations, including handling requests, processing data, and interacting with the database.
   - The API uses MongoDB as the database and follows an MVC (Model-View-Controller) architecture to ensure maintainability and scalability.
   - It includes CRUD operations for managing boards, lists, cards, users, and roles, along with authentication and authorization mechanisms.
   - The backend also features file uploads through Cloudinary and secure user authentication using JWT and bcrypt.

   For detailed information on the backend, including setup and technologies used, refer to the [Boardify API Documentation](https://github.com/ChristianDev47/Boardify/blob/master/Backend/README.md).

2. **Frontend - Boardify Web Interface**:

   - The frontend of the application is built with React, providing a responsive and dynamic user interface.
   - It offers functionalities such as user registration, login, board management, list and card handling, and activity tracking.
   - The frontend uses Tailwind CSS for styling, React Hook Form for handling forms, and Zod for data validation.
   - Additionally, it integrates React Beautiful DnD for drag-and-drop functionality, FullCalendar for managing deadlines, and React Datepicker for scheduling tasks.

   For more details on the frontend, including setup instructions and technologies used, check out the [Boardify Frontend Documentation](https://github.com/ChristianDev47/Boardify/blob/master/Frontend/README.md).

## Core Features

- **User Authentication**: Secure registration, login, and logout functionalities with token-based authentication and encrypted password storage.
- **Board Management**: Create, customize, and manage boards, lists, and cards with drag-and-drop functionality.
- **Card Details**: Comprehensive card management including titles, cover images, checklists, labels, due dates, and team member assignments.
- **Activity Tracking**: Monitor changes and updates to boards, lists, and cards with detailed activity logs.
- **Customizable Boards**: Personalize boards with background images, colors, and uploaded files.
- **Table and Calendar Views**: View and filter cards in a tabular format and visualize them on a calendar.
- **Responsive Design**: Ensures a consistent and seamless user experience across all devices, from desktops to mobile phones.
- **API Documentation and Testing**: Detailed API documentation and comprehensive testing to ensure reliability and maintainability.
- **Dockerization**: Both frontend and backend are Dockerized for consistent development and deployment environments.

## Technologies Used

### Backend - Boardify API:
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database for scalable data storage.
- **Mongoose**: ODM for MongoDB to simplify data modeling.
- **Swagger UI**: Tool for interactive API documentation.
- **JWT**: For user authentication and session management.
- **Bcrypt**: For password hashing and security.
- **Cloudinary**: Media storage and optimization service.
- **Multer**: Middleware for handling file uploads.
- **Docker**: Containerization for consistent deployments.
- **Jest**: Testing framework for backend unit and integration tests.
- **Supertest**: Library for testing API endpoints.

### Frontend - Boardify Web Interface:
- **React**: JavaScript library for building dynamic UIs.
- **Tailwind CSS**: Utility-first framework for responsive styling.
- **FullCalendar**: For visualizing and managing calendar events.
- **React Hook Form**: Simplifies form management and validation.
- **Zod**: Schema validation for form and API data.
- **Framer Motion**: Library for adding smooth animations.
- **React Beautiful DnD**: Drag-and-drop for intuitive card reordering.
- **React Datepicker**: Date picker for managing task deadlines.
- **React Docs Preview**: Document preview for attached files.
- **Js-Cookie**: Handles cookies for session and token management.
- **React Hot Toast**: For displaying real-time toast notifications.

## Project Structure

- The backend handles server-side logic, including API endpoints, database interactions, and authentication.
- The frontend provides a dynamic and interactive user interface, communicating with the backend API to manage and display project data.

Each component is designed to be modular and scalable, facilitating easy maintenance and future enhancements.

Boardify exemplifies a full-stack approach to building a modern project management tool, utilizing advanced technologies to deliver a robust, scalable, and user-friendly application.

## Demo

You can see the application in action here: [Boardify Live Demo](https://boardify-liart.vercel.app/).

![Boardify](https://raw.githubusercontent.com/ChristianDev47/Boardify/refs/heads/master/Frontend/public/boardify.webp)

