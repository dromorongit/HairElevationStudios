# Railway Configuration for Hair Elevation Studios

## 🔧 Your Specific Railway Setup

Based on your Railway MongoDB service, here's the exact configuration:

### Environment Variables to Set in Railway

In your Railway dashboard, go to your backend service → Variables and set these exact values:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo:YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt@mongodb.railway.internal:27017
JWT_SECRET=your-super-secure-jwt-secret-change-this-in-production-make-it-long-and-random
JWT_EXPIRE=30d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-production-password
ADMIN_EMAIL=your-email@example.com
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
CORS_ORIGIN=https://your-frontend-domain.com
```

### 🚨 Important Notes:

1. **JWT_SECRET**: Make it long and random (e.g., `my-super-secret-jwt-key-for-hair-elevation-studios-2024`)
2. **ADMIN_PASSWORD**: Use a strong password for production
3. **ADMIN_EMAIL**: Use your actual email address
4. **CORS_ORIGIN**: Update this to your frontend domain once deployed

### 📝 Step-by-Step Railway Setup:

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Open your project

2. **Add Environment Variables**
   - Click on your backend service
   - Go to Variables tab
   - Add each variable from the list above

3. **Deploy**
   - Railway will automatically redeploy with new variables
   - Check the Deploy tab for build progress

4. **Test Deployment**
   - Visit: `https://your-app.railway.app/health`
   - You should see: `{"status":"OK",...}`

5. **Access Admin Interface**
   - Visit: `https://your-app.railway.app/admin`
   - Login with your admin credentials

### 🔍 MongoDB Connection Details:

Your MongoDB URI format is perfect for Railway:
```
mongodb://mongo:YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt@mongodb.railway.internal:27017
```

This uses:
- **Username**: `mongo`
- **Password**: `YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt`
- **Host**: `mongodb.railway.internal` (Railway's internal network)
- **Port**: `27017` (Standard MongoDB port)

### 📊 Database Information:

- **Database Name**: Railway will create a database automatically
- **Default Collections**: Products, Admins (will be created automatically)
- **Storage**: Managed by Railway's MongoDB service

### 🛡️ Security Recommendations:

1. **Change Default Password**: Update `ADMIN_PASSWORD` to something secure
2. **Strong JWT Secret**: Use a long, random string for `JWT_SECRET`
3. **CORS Configuration**: Update `CORS_ORIGIN` to your actual frontend domain
4. **Environment Variables**: Never commit `.env` files to git

### 🔧 Troubleshooting:

#### If MongoDB Connection Fails:
1. Check Railway logs: Service → Deploy → View Logs
2. Verify `MONGODB_URI` is exactly as provided
3. Ensure MongoDB service is added to your project

#### If Admin Login Fails:
1. Check if default admin was created in logs
2. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set correctly
3. Try restarting the service

#### If File Uploads Don't Work:
1. Check Railway logs for file system errors
2. Verify `UPLOAD_PATH` is set to `./uploads`
3. Ensure the service has write permissions

### 📞 Support:

If you encounter issues:
1. Check Railway deployment logs first
2. Verify all environment variables are set
3. Test the health endpoint: `/health`
4. Ensure MongoDB service is running

---

**Your Railway setup is now configured for Hair Elevation Studios!** 🎉