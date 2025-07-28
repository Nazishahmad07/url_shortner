# MongoDB Atlas Setup Guide

## Fix MongoDB Connection Error

The error shows that your MongoDB Atlas cluster is not accessible from Render's IP addresses. Here's how to fix it:

### Step 1: Access MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in to your account
3. Select your cluster

### Step 2: Configure Network Access
1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` to your IP whitelist
   - **Note**: For production, you should whitelist specific IPs

### Step 3: Verify Database User
1. Go to **"Database Access"** in the left sidebar
2. Make sure your database user has the correct permissions:
   - **Database User Privileges**: `Read and write to any database`
   - **Built-in Role**: `Atlas admin` or `Read and write to any database`

### Step 4: Get Connection String
1. Go to **"Clusters"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual database password

### Step 5: Update Render Environment Variables
1. Go to your Render dashboard
2. Select your service
3. Go to **"Environment"** tab
4. Update the `MONGODB_URI` variable with your connection string

### Example Connection String Format:
```
mongodb+srv://username:password@cluster-name.gwzxz3q.mongodb.net/url-shortener?retryWrites=true&w=majority
```

## Alternative: Use Render's MongoDB

If you prefer, you can use Render's built-in MongoDB:

### Step 1: Create MongoDB Service in Render
1. In your Render dashboard, click **"New +"**
2. Select **"Redis"** or **"PostgreSQL"** (Render doesn't have MongoDB yet)
3. Or use **Railway** which has MongoDB:
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Add MongoDB database
   - Get the connection string

## Testing the Connection

After updating the environment variables:

1. **Redeploy your service** in Render
2. **Check the logs** for connection success
3. **Test the API** by visiting your Render URL

## Security Best Practices

### For Production:
1. **Whitelist specific IPs** instead of allowing all
2. **Use strong passwords** for database users
3. **Enable MongoDB Atlas security features**:
   - Database user authentication
   - Network access controls
   - Audit logging

### IP Whitelist for Render:
If you want to whitelist only Render's IPs (not recommended for simplicity):
- Add your Render service's IP to MongoDB Atlas Network Access
- You can find this in your Render service logs

## Troubleshooting

### Common Issues:

1. **"Could not connect to any servers"**:
   - Check Network Access settings
   - Verify connection string format
   - Ensure database user exists

2. **"Authentication failed"**:
   - Check username and password
   - Verify database user permissions

3. **"Connection timeout"**:
   - Check if MongoDB Atlas is accessible
   - Verify network connectivity

### Quick Fix Commands:

```bash
# Test MongoDB connection locally
mongosh "your_connection_string"

# Check if your IP is whitelisted
curl https://ipinfo.io/ip
```

---

**🎯 After following these steps, your MongoDB connection should work!**

Redeploy your Render service and the connection error should be resolved. 