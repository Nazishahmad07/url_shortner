# Debug Guide: Login/Signup Issues

## Step 1: Check Environment Variables

### In Vercel Dashboard:
1. Go to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Make sure you have:
   ```
   REACT_APP_API_URL=https://url-shortner-us9m.onrender.com
   ```

### In Render Dashboard:
1. Go to your Render service
2. Click "Environment" tab
3. Make sure you have:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

## Step 2: Test Backend API Directly

### Test Registration:
```bash
curl -X POST https://url-shortner-us9m.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login:
```bash
curl -X POST https://url-shortner-us9m.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Step 3: Check Browser Console

1. **Open your Vercel frontend**
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Try to login/signup**
5. **Look for error messages**

Common errors to look for:
- `CORS` errors
- `Network` errors
- `API URL` not found

## Step 4: Check Network Tab

1. **Open Developer Tools**
2. **Go to Network tab**
3. **Try to login/signup**
4. **Look for failed requests**
5. **Check the request URL and response**

## Step 5: Update CORS Settings

If you see CORS errors, update your Vercel URL in `server.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-actual-vercel-url.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Step 6: Test Environment Variable

Add this to your React app temporarily to check the API URL:

```javascript
// In any component, add this temporarily:
console.log('API URL:', process.env.REACT_APP_API_URL);
```

## Step 7: Common Issues & Solutions

### Issue 1: "Network Error"
**Solution**: Check if `REACT_APP_API_URL` is set correctly in Vercel

### Issue 2: "CORS Error"
**Solution**: Update CORS settings in backend with your actual Vercel URL

### Issue 3: "MongoDB Connection Error"
**Solution**: Check MongoDB Atlas Network Access settings

### Issue 4: "Invalid credentials"
**Solution**: Check if MongoDB is properly connected

## Step 8: Quick Fixes

### Fix 1: Update CORS with your actual Vercel URL
Replace `your-vercel-app.vercel.app` with your actual Vercel URL in `server.js`

### Fix 2: Redeploy Backend
After updating CORS, redeploy your Render service

### Fix 3: Clear Browser Cache
Clear browser cache and try again

## Step 9: Test Complete Flow

1. **Register a new user** via curl or Postman
2. **Login with the user** via curl or Postman
3. **Check if user exists** in MongoDB Atlas
4. **Try frontend login** again

## Step 10: Debug Commands

```bash
# Test backend health
curl https://url-shortner-us9m.onrender.com/

# Test registration
curl -X POST https://url-shortner-us9m.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# Test login
curl -X POST https://url-shortner-us9m.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

---

**🔍 Follow these steps to identify the exact issue!**

Let me know what errors you see in the browser console or network tab. 