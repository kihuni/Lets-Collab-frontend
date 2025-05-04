# Lets-Collab Frontend

Frontend for the **Lets-Collab** project, a collaborative platform built for the 2025 DEV Challenge hackathon. This React-based frontend provides a user-friendly interface for authentication, project/task management, and access control, styled with CSS Modules for a clean and professional look.

## Tech Stack
- **React**: Frontend framework for building the UI.
- **Vite**: Fast build tool and development server.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend API.
- **CSS Modules**: For scoped, maintainable styling.

## Features
- **User Authentication**: Login with JWT-based authentication.
- **Dashboard**: Create and view projects and tasks with role-based access.
- **Access Control Dashboard**: View audit logs and permission details (admin-only).
- **Responsive Design**: Styled with CSS Modules for a polished UI.
- **CORS Integration**: Seamlessly communicates with the backend API.

## Prerequisites
- Node.js (v18.x.x recommended; v20.17.0 used in development)
- npm (v9.x.x or higher)
- Backend server running at `http://localhost:8000` (see [Lets-Collab Backend](#backend-repository))

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone https://github.com/<your-username>/Lets-Collab-frontend.git
   cd Lets-Collab-frontend
   ```

Install Dependencies:

```
npm install
```
Start the Development Server:
```

npm run dev
```

The app will be available at http://localhost:5173.

Environment Variables (Optional for Production):
Create a .env file in the root directory:

VITE_API_URL=http://localhost:8000

Update the API URL for production (e.g., https://Lets-Collab-backend.vercel.app).

Usage
Ensure the backend server is running (see Backend Setup (#backend-repository)).

Open http://localhost:5173 in your browser.

Log in with one of the test users:

- Admin: Username: admin, Password: 2025DEVChallenge

- User: Username: newuser, Password: 2025DEVChallenge

Explore the Dashboard to create/view projects and tasks.

Admins can access the Access Control Dashboard to view audit logs and permissions.

Project Structure
```
lets-collab-frontend/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── AccessControlDashboard.js
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── *.module.css    # CSS Modules for each component
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   ├── index.css           # Global styles
│   └── App.module.css      # CSS Module for App.jsx
├── .gitignore              # Git ignore file
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```
Deployment

The frontend is deployed on Vercel:

https://Lets-Collab-frontend.vercel.app
To deploy on Vercel:

Push the repository to GitHub.

Import the repository into Vercel.

Set the environment variable VITE_API_URL to the backend URL (e.g., https://Lets-Collab-backend.vercel.app).

Deploy the app.

