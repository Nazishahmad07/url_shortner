# Deployment Guide

This guide will help you deploy your URL Shortener MERN stack application to various platforms.

## Prerequisites

1. **MongoDB Database**: You'll need a MongoDB database. You can use:
   - [MongoDB Atlas](https://www.mongodb.com/atlas) (Free tier available)
   - [Railway](https://railway.app/) (Free tier available)
   - [Render](https://render.com/) (Free tier available)

2. **Git Repository**: Make sure your code is in a Git repository (GitHub, GitLab, etc.)

## Option 1: Deploy to Render (Recommended - Free)

### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

### Step 2: Deploy to Render
1. Go to [Render](https://render.com/)
2. Sign up with your GitHub account
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `url-shortener`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Set Environment Variables
In your Render dashboard, go to Environment and add:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

## Option 2: Deploy to Railway

### Step 1: Set up Railway
1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

### Step 2: Add MongoDB
1. In your Railway project, click "New"
2. Select "Database" → "MongoDB"
3. Copy the connection string

### Step 3: Configure Environment Variables
Add these variables in Railway:
```
NODE_ENV=production
MONGODB_URI=your_railway_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 4: Deploy
Railway will automatically deploy your app.

## Option 3: Deploy to Heroku

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
heroku create your-app-name
```

### Step 4: Add MongoDB
```bash
heroku addons:create mongolab:sandbox
```

### Step 5: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 6: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## Option 4: Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

Note: For Vercel, you'll need to set up a separate backend deployment.

## Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

## MongoDB Atlas Setup (if using Atlas)

1. **Create Cluster**:
   - Choose "Free" tier
   - Select your preferred region
   - Click "Create"

2. **Set up Database Access**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create a username and password
   - Select "Read and write to any database"

3. **Set up Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your deployment platform's IP

4. **Get Connection String**:
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Post-Deployment

After deployment:

1. **Test your application**:
   - Visit your deployed URL
   - Register a new account
   - Create some short URLs
   - Test the redirect functionality

2. **Monitor your application**:
   - Check logs for any errors
   - Monitor database connections
   - Test all features

3. **Set up custom domain** (optional):
   - Most platforms allow custom domains
   - Update your DNS settings accordingly

## Troubleshooting

### Common Issues:

1. **Build fails**:
   - Check if all dependencies are in package.json
   - Ensure Node.js version is compatible

2. **Database connection fails**:
   - Verify MongoDB connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **Environment variables not working**:
   - Double-check variable names
   - Restart the application after adding variables

4. **Redirect not working**:
   - Ensure the redirect route is properly configured
   - Check if the shortCode is being generated correctly

## Security Considerations

1. **Change JWT_SECRET** to a strong, unique key
2. **Use HTTPS** in production
3. **Set up proper CORS** if needed
4. **Monitor for security vulnerabilities**
5. **Regularly update dependencies**

## Performance Optimization

1. **Enable compression** in production
2. **Use CDN** for static assets
3. **Implement caching** strategies
4. **Monitor database performance**
5. **Set up logging** for debugging

---

**Your URL Shortener is now ready for deployment! 🚀**

Choose the platform that best fits your needs and follow the steps above. 