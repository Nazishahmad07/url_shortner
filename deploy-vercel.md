# Vercel Frontend Deployment Guide

## Quick Steps to Deploy Frontend to Vercel

### Step 1: Prepare Your Code
```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables
In Vercel dashboard, go to your project settings and add:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

## Backend Deployment

You'll need to deploy the backend separately. Choose one:

### Option A: Render (Recommended)
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add MongoDB database
4. Set environment variables

### Option C: Heroku
```bash
heroku create your-backend-app
heroku addons:create mongolab:sandbox
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

## Update CORS Settings

After getting your Vercel URL, update the backend CORS settings in `server.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-actual-vercel-url.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

## Testing

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints
3. **Integration**: Register and test all features

## Environment Variables Summary

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (Render/Railway/Heroku)
```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

---

**🎯 Your frontend is ready for Vercel deployment!**

Follow the steps above and refer to `BACKEND_DEPLOYMENT.md` for backend deployment. 