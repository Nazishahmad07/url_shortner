# Backend Deployment Guide

Since you're deploying the frontend to Vercel, you'll need to deploy the backend separately. Here are the best options:

## Option 1: Render (Recommended)

### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string

### Step 2: Deploy Backend to Render
1. Go to [Render](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `url-shortener-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (deploy from root)

### Step 3: Set Environment Variables
In Render dashboard, add:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

## Option 2: Railway

### Step 1: Deploy to Railway
1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository

### Step 2: Add MongoDB
1. In your Railway project, click "New"
2. Select "Database" → "MongoDB"
3. Copy the connection string

### Step 3: Set Environment Variables
Add:
```
NODE_ENV=production
MONGODB_URI=your_railway_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

## Option 3: Heroku

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Step 2: Create Heroku App
```bash
heroku create your-backend-app-name
```

### Step 3: Add MongoDB
```bash
heroku addons:create mongolab:sandbox
```

### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 5: Deploy
```bash
git push heroku main
```

## Frontend Configuration

After deploying the backend, update your frontend:

### Step 1: Get Backend URL
- Render: `https://your-app-name.onrender.com`
- Railway: `https://your-app-name.railway.app`
- Heroku: `https://your-app-name.herokuapp.com`

### Step 2: Update Vercel Environment Variables
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

### Step 3: Redeploy Frontend
Vercel will automatically redeploy when you push changes.

## Testing the Deployment

### Backend Testing
```bash
# Test your backend URL
curl https://your-backend-url.com/api/auth/user
```

### Frontend Testing
1. Visit your Vercel frontend URL
2. Register a new account
3. Create some short URLs
4. Test all features

## Environment Variables Summary

### Backend (Render/Railway/Heroku)
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Backend needs to allow frontend domain
   - Update CORS settings in server.js

2. **API Connection Fails**:
   - Check REACT_APP_API_URL in Vercel
   - Verify backend URL is correct
   - Test backend URL directly

3. **Build Fails**:
   - Check all dependencies are installed
   - Verify Node.js version compatibility

4. **Database Connection**:
   - Verify MongoDB connection string
   - Check network access settings

## Quick Commands

```bash
# Test backend locally
npm run server

# Test frontend locally
cd client && npm start

# Deploy to Heroku
git push heroku main

# Check Heroku logs
heroku logs --tail
```

---

**🎯 Your backend is ready for deployment!**

Choose your preferred platform and follow the steps above. 