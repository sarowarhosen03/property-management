# Real Estate Backend API

This is the backend server for the Safe House real estate application. It handles all the logic for managing properties, users, authentication, and other related operations, built with Node.js and Express.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) (running locally or on a cloud service)

## Installation

1.  Navigate to the `real-estate-backend` directory:
    ```bash
    cd real-estate-backend
    ```

2.  Install the project dependencies:
    ```bash
    npm install
    ```
    or if you are using pnpm:
    ```bash
    pnpm install
    ```

## Configuration

1.  Create a `.env` file in the root of the `real-estate-backend` directory.
2.  You will need to add the following environment variables to your `.env` file. Populate them with your specific settings.

    ```env
    # Port for the server to run on
    PORT=8000

    # Your MongoDB connection string
    MONGO_URI=mongodb://localhost:27017/safehouse

    # JWT secret for signing tokens
    JWT_SECRET=your_super_secret_jwt_key

    # Frontend URL for CORS
    CLIENT_URL=http://localhost:3000
    ```

## Running the Application

To start the server in development mode with automatic restarts on file changes, run:

```bash
npm start
```

The server will be running on the port specified in your `.env` file (e.g., `http://localhost:8000`).

## Key Dependencies

- **[Express](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.
- **[Mongoose](https://mongoosejs.com/)**: Elegant MongoDB object modeling for Node.js.
- **[JSON Web Token](https://jwt.io/)**: For handling user authentication.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: For hashing passwords.
- **[Multer](https://www.npmjs.com/package/multer)**: Middleware for handling `multipart/form-data`, used for file uploads.
- **[CORS](https://www.npmjs.com/package/cors)**: For enabling Cross-Origin Resource Sharing.
- **[Dotenv](https://www.npmjs.com/package/dotenv)**: For loading environment variables from a `.env` file.
- **[Morgan](https://www.npmjs.com/package/morgan)**: HTTP request logger middleware.
