# 🚀 Railway Environment Variables - Hair Elevation Studios

## 📋 **Required Environment Variables for Railway Deployment**

In your Railway dashboard, go to your backend service → Variables and add these **exact** values:

### **🔧 Core Configuration:**
```env
NODE_ENV=production
PORT=5000
```

### **🗄️ MongoDB Configuration:**
```env
MONGODB_URI=mongodb://mongo:YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt@mongodb.railway.internal:27017
```

### **🔐 Security Configuration:**
```env
JWT_SECRET=hair-elevation-studios-2025-jwt-secret-key-a7b3c9d2e8f1g5h6i9j0k3l4m6n7o8p9q1r2s5t6u7v8w9x0y2z4a6b8c0d1e3f5g7h9i0j1k2l3m4n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### **📁 File Upload Configuration:**
```env
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

### **🌐 CORS Configuration (Updated for GitHub Pages & Custom Domain):**
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:8080,http://localhost:5500,https://dromorongit.github.io,https://www.hairelevationstudio.com,https://hairelevationstudio.com
```

---

## 📝 **Step-by-Step Instructions:**

### **1. Open Railway Dashboard**
- Go to [railway.app](https://railway.app)
- Select your Hair Elevation Studios project

### **2. Access Backend Service Variables**
- Click on your backend service
- Go to the **Variables** tab

### **3. Add Each Variable**
For each variable above:
- Click **"New Variable"**
- Enter the **Variable Name** (e.g., `NODE_ENV`)
- Enter the **Value** (e.g., `production`)
- Click **"Add"**

### **4. Complete Variable List**
Add all these 7 variables:
1. `NODE_ENV` = `production`
2. `PORT` = `5000`
3. `MONGODB_URI` = `mongodb://mongo:YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt@mongodb.railway.internal:27017`
4. `JWT_SECRET` = `hair-elevation-studios-2025-jwt-secret-key-a7b3c9d2e8f1g5h6i9j0k3l4m6n7o8p9q1r2s5t6u7v8w9x0y2z4a6b8c0d1e3f5g7h9i0j1k2l3m4n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`
5. `MAX_FILE_SIZE` = `10485760`
6. `UPLOAD_PATH` = `./uploads`
7. `CORS_ORIGIN` = `http://localhost:3000,http://localhost:8080,http://localhost:5500,https://dromorongit.github.io,https://www.hairelevationstudio.com,https://hairelevationstudio.com`

### **5. Deploy**
- After adding all variables, Railway will automatically redeploy
- Check the **Deploy** tab for build progress

---

## ✅ **Verification:**

After deployment, your system should show:
- **Health Check**: `https://your-app.railway.app/health` → `{"status":"OK",...}`
- **Admin Interface**: `https://your-app.railway.app/` (Root URL) - Login/signup page
- **API Info**: `https://your-app.railway.app/api-info` → API endpoints documentation
- **First Time Setup**: Create your admin account using the "Create Admin Account" option
- **Subsequent Access**: Login with your created credentials
- **Account Management**: Use "Delete Account" button to remove your admin account if needed

---

## 🌐 **Domain Configuration:**

### **Frontend Domains Supported:**
- ✅ **GitHub Pages**: `https://dromorongit.github.io/HairElevationStudios/`
- ✅ **Custom Domain**: `https://www.hairelevationstudio.com`
- ✅ **Custom Domain (no www)**: `https://hairelevationstudio.com`
- ✅ **Localhost**: `http://localhost:3000`, `http://localhost:8080`, `http://localhost:5500`

### **Backend Integration:**
Your frontend will automatically connect to your Railway backend regardless of which domain you're using.

---

## **Expected Results:**

With these environment variables set, your Hair Elevation Studios admin system will:
- ✅ Connect to your Railway MongoDB service
- ✅ Use secure JWT authentication
- ✅ Allow custom admin account creation (no default credentials)
- ✅ Allow account deletion for system reset if needed
- ✅ Allow file uploads
- ✅ Serve admin interface at root URL `/`
- ✅ Provide full product management capabilities
- ✅ Work across GitHub Pages and custom domain
- ✅ Support CORS for all your domains

**Your admin system will be live and ready to manage your wig products, collections, and inventory across all your domains!** 🚀