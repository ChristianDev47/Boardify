# Boardify Frontend

Boardify Frontend is a modern, responsive web application designed with React and Tailwind CSS. Inspired by Trello, Boardify offers a user-friendly interface for managing projects, boards, lists, and cards. This application enables users to efficiently organize their tasks and collaborate with team members in a visually appealing and interactive environment.

## Core Features

- **User Registration and Authentication**: Users can register, log in, and log out. Access tokens are used for secure authentication.
- **Welcome Screen**: Provides an overview of Boardify’s features and allows new users to get started by creating their first board, lists, and cards or skip these steps.
- **Workspace Overview**: After logging in, users can view their workspace with a top and left navbar. The workspace includes:
  - **Dashboard**: Displays an introduction to boards, recent boards, and collaborative boards.
  - **Boards**: Shows recent boards, user-created boards, and collaborative boards.
  - **Members**: Allows users to invite others to their boards via links and view all members with whom they share boards.
- **Board Customization**: Users can personalize boards with backgrounds (images, colors, or files) and manage board settings.
- **Board Management**: Users can:
  - Create and manage lists and cards.
  - Move and reorder lists and cards using drag-and-drop.
  - Access and edit cards through a modal with options to update title, cover, checklist, labels, due dates, and members.
- **Activity Tracking**: All changes to boards, lists, and cards are recorded and stored in the database.
- **Board Settings**: Users can configure board settings, including hiding card covers and viewing board members.
- **Table View**: A table summarizing card details, including list, name, member, labels, and due dates. Includes filtering options for completed cards, expired cards, etc.
- **Calendar View**: Displays cards in a calendar format with small labels indicating card names.
- **User Profile Settings**: Users can update their name, surname, email, and profile picture.


## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **@fullcalendar/core**, **@fullcalendar/daygrid**, **@fullcalendar/interaction**, **@fullcalendar/react**: Libraries for calendar functionalities.
- **@hookform/resolvers**, **react-hook-form**: Form handling and validation.
- **framer-motion**: Animation library for React.
- **js-cookie**: Manages cookies for authentication.
- **react-beautiful-dnd**: Drag-and-drop library for managing lists and cards.
- **react-datepicker**: Date picker component.
- **react-docs-preview**: For document preview functionalities.
- **react-extract-colors**: Extracts colors from images.
- **react-hot-toast**: Provides toast notifications.
- **react-router-dom**: Handles routing and navigation.
- **zod**: Data validation library.
