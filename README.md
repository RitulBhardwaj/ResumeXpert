# ResumeXpert

A modern resume builder application built with React and Express.js.

## Features

- 🎨 Multiple resume templates
- ✏️ Real-time resume editor
- 💾 Save and manage multiple resumes
- 📄 Export resumes as PDF
- 🔐 User authentication
- 🖼️ Image upload support

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file uploads)

## Project Structure

```
ResumeXpert/
├── frontend/          # React frontend application
├── backend/            # Express.js backend API
└── render.yaml        # Render deployment configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ResumeXpert
```

2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables

Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000
```

4. Run the application

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Render.

## License

ISC

