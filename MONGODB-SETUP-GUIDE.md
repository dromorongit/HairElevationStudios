# MongoDB Setup Guide for Hair Elevation Studios Admin System

## Problem Diagnosis

Your "Update Product" button is not working because the backend server cannot connect to MongoDB. The server is running but fails when trying to communicate with the database.

## Quick Fix Options

### Option 1: Install MongoDB Locally (Recommended for Development)

1. **Download and Install MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Choose:
     - Platform: Windows 64 (8.1+)
     - Package: .msi
   - Run the installer and follow the setup wizard

2. **Start MongoDB Service**
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`
   
   Or manually start MongoDB:
   - Run: `mongod --dbpath "C:\Program Files\MongoDB\Server\7.0\data"`

3. **Test Connection**
   - Open a new command prompt
   - Run: `mongo`
   - If you see the MongoDB shell, it's working!

### Option 2: Use MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Free Account**
   - Visit: https://cloud.mongodb.com/
   - Sign up for free

2. **Create Cluster**
   - Choose the free tier (M0)
   - Select a region close to you
   - Create cluster

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

4. **Update Environment Variables**
   - Edit `backend/.env` file
   - Replace the MONGODB_URI line with your Atlas connection string

### Option 3: Docker MongoDB (Alternative)

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop

2. **Run MongoDB Container**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

## Environment Configuration

After setting up MongoDB, ensure your `backend/.env` file contains:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/hairelevation

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server Port
PORT=5000

# CORS Origin
CORS_ORIGIN=http://localhost:3000,http://localhost:5000,file://
```

## Testing the Fix

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check Server Logs**
   - You should see: "Connected to MongoDB"
   - You should see: "Server running on port 5000"

3. **Test Admin Interface**
   - Open: http://localhost:5000
   - Login or create an account
   - Navigate to Products section
   - Try adding/updating a product

## Troubleshooting

### If MongoDB connection still fails:

1. **Check if MongoDB is running**
   ```bash
   ps aux | grep mongod
   # or on Windows:
   tasklist | findstr mongod
   ```

2. **Check MongoDB logs**
   - Look in MongoDB data directory for log files
   - Default location: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`

3. **Test connection manually**
   ```bash
   mongo --host localhost --port 27017
   ```

### If you still see connection errors:

1. **Check firewall settings**
2. **Verify MongoDB is bound to correct interface**
   - Edit `mongod.conf` to bind to `0.0.0.0` or `127.0.0.1`

## Production Deployment

For production, we recommend:
1. Using MongoDB Atlas for reliability
2. Setting up proper environment variables
3. Using environment-specific configuration files

## Need Help?

If you're still having issues after following this guide:
1. Check the console output in your browser (F12 → Console)
2. Look at the server logs in the terminal
3. Ensure all dependencies are installed (`npm install` in backend directory)