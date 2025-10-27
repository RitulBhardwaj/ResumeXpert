# Deployment Guide for ResumeXpert on Render

This guide will help you deploy the ResumeXpert application on Render.

## Prerequisites

- GitHub account with your code pushed to a repository
- Render account (sign up at https://render.com)
- MongoDB Atlas account (for database)

## Step 1: Deploy Backend

1. Log in to your Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** resumexpert-backend
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** `npm ci --production`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or choose your preferred plan)

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = (leave blank, Render auto-assigns this)
   - `MONGODB_URI` = Your MongoDB connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/ResumeXpert`)
   - `FRONTEND_URL` = (you'll add this after deploying frontend)

6. Click "Create Web Service"

## Step 2: Deploy Frontend

1. In Render dashboard, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure the service:
   - **Name:** resumexpert-frontend
   - **Root Directory:** frontend
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** dist
   - **Environment:** Node

4. Add Environment Variable:
   - `VITE_API_URL` = Your backend URL from Step 1 (e.g., `https://resumexpert-backend.onrender.com`)

5. Click "Create Static Site"

## Step 3: Update Environment Variables

### Backend
1. Go to your backend service in Render
2. Navigate to Environment tab
3. Update `FRONTEND_URL` to your frontend URL (e.g., `https://resumexpert-frontend.onrender.com`)

## Environment Variables Reference

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Important Notes

1. **CORS Configuration**: The backend is configured to accept requests from the FRONTEND_URL environment variable
2. **File Uploads**: The backend serves uploaded files from the `/uploads` directory
3. **MongoDB**: Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
4. **Build Time**: First deployment may take 5-10 minutes

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is built and deployed
- [ ] Environment variables are set correctly
- [ ] Frontend can connect to backend API
- [ ] MongoDB connection is working
- [ ] User authentication flow works
- [ ] File uploads are working

## Troubleshooting

### Backend not starting / Nodemon denied access
- This is fixed by using `npm ci --production` which skips devDependencies
- The backend now properly uses `node server.js` instead of nodemon for production
- Check environment variables are set correctly
- Verify MongoDB connection string is correct
- Check build logs in Render dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set to the correct backend URL
- Check backend CORS settings
- Ensure backend is running

### 404 errors on images
- Ensure uploads directory exists in backend
- Check file permissions on Render

## Updating the Deployment

Simply push changes to your GitHub repository, and Render will automatically rebuild and redeploy your services.

