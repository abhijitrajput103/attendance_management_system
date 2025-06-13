# Student Attendance System

## Description

This project is a Student Attendance System built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows for managing users, classes, marking attendance, and generating attendance reports.

## Features

- User Authentication (Signup, Login)
- User Management (For admin roles)
- Class Management
- Marking Attendance (For Teachers roles)
- Viewing Attendance Reports (For Students roles)
- Dashboard for overview

## Technologies Used

**Frontend:**

*   React
*   Vite (as build tool)
*   Tailwind CSS (for styling)
*   Zustand (potentially for state management)

**Backend:**

*   Node.js
*   Express.js (Web Framework)
*   MongoDB (Database)
*   Mongoose (MongoDB ODM)
*   bcryptjs (for password hashing)
*   jsonwebtoken (for authentication tokens)
*   cors (for handling Cross-Origin Requests)
*   dotenv (for environment variables)
*   helmet (for securing Express apps)

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   Node.js installed (includes npm)
*   MongoDB installed and running

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd student-attendance-system
    ```
2.  Install dependencies for both frontend and backend:
    ```bash
    npm run build
    ```
    This command will install dependencies in both `backend` and `frontend` directories and build the frontend.

3.  Create a `.env` file in the `backend` directory and add your MongoDB connection string and JWT secret:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Running the Project

To run the project, execute the start script from the root directory:

```bash
npm start
```

This will start the backend server. The frontend will be served separately (usually by navigating to the frontend directory and running `npm run dev` during development, but the `npm start` script in the root only starts the backend based on the `package.json`). For a production build, the frontend build artifacts would typically be served by the backend.

## Project Structure

```
student-attendance-system/
├── backend/             # Express.js backend code
├── frontend/            # React frontend code
├── .gitignore
├── package.json         # Root package.json with scripts
├── package-lock.json
└── README.md            # Project README file
```

## License

This project is licensed under the ISC License.
