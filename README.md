# Full-Stack Portfolio Application

A modern, full-stack portfolio application built with React and Node.js, featuring project showcase capabilities and secure admin authentication.

## Features

- **Project Showcase**: Display your projects with details including title, description, tech stack, images, and live demo links
- **Admin Dashboard**: Secure admin interface for managing portfolio content
- **JWT Authentication**: Secure API endpoints with JSON Web Token authentication
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd full-stack-portfolio
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../portfolio
npm install
```

4. Create a .env file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd ../portfolio
npm run dev
```

## Project Structure

```
├── portfolio/          # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── server/            # Backend Node.js application
    ├── models/        # MongoDB models
    ├── routes/        # API routes
    ├── middleware/    # Custom middleware
    └── server.js      # Entry point
```

## API Endpoints

### Authentication
- POST /api/auth/login - Admin login

### Projects
- GET /api/projects - Get all projects
- POST /api/projects - Create new project (Admin only)
- PUT /api/projects/:id - Update project (Admin only)
- DELETE /api/projects/:id - Delete project (Admin only)

## Security

- Passwords are hashed using bcrypt
- JWT tokens for API authentication
- Protected admin routes
- Environment variables for sensitive data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.