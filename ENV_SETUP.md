# Environment Variables Setup

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ResumeXpert
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### For Local Development:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ResumeXpert
FRONTEND_URL=http://localhost:5173
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
VITE_API_URL=https://your-backend-app.onrender.com
```

### For Local Development:
```env
VITE_API_URL=http://localhost:5000
```

## Render Environment Variables

When deploying on Render, add these environment variables in the Render dashboard for each service:

### Backend Service (resumexpert-backend)
```
NODE_ENV = production
MONGODB_URI = your_mongodb_connection_string
FRONTEND_URL = https://your-frontend-app.onrender.com
```

### Frontend Service (resumexpert-frontend)
```
VITE_API_URL = https://your-backend-app.onrender.com
```

**Note:** The `PORT` variable is automatically set by Render for web services, so you don't need to add it.

