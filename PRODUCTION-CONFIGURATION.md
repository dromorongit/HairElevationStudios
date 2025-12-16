# 🌐 Production Configuration - Hair Elevation Studios

## 📋 **Updated Environment Variables for Railway**

Based on your deployment setup:
- **Current Frontend**: https://dromorongit.github.io/HairElevationStudios/
- **Future Custom Domain**: www.hairelevationstudio.com

## 🔧 **Required Railway Environment Variables:**

Add these **exact** variables to your Railway backend service:

### **1. Core Configuration:**
```env
NODE_ENV=production
PORT=5000
```

### **2. MongoDB:**
```env
MONGODB_URI=mongodb://mongo:YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt@mongodb.railway.internal:27017
```

### **3. Security:**
```env
JWT_SECRET=hair-elevation-studios-2025-jwt-secret-key-a7b3c9d2e8f1g5h6i9j0k3l4m6n7o8p9q1r2s5t6u7v8w9x0y2z4a6b8c0d1e3f5g7h9i0j1k2l3m4n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### **4. File Upload Settings:**
```env
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

### **6. CORS Configuration (UPDATED):**
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:8080,http://localhost:5500,https://dromorongit.github.io,https://www.hairelevationstudio.com,https://hairelevationstudio.com
```

---

## 🔗 **Frontend API Configuration**

I've updated `js/api-config.js` to automatically detect your domain:

### **Current Configuration:**
- **GitHub Pages**: `https://dromorongit.github.io` → Points to Railway backend
- **Custom Domain**: `www.hairelevationstudio.com` → Points to Railway backend
- **Localhost**: `http://localhost:5000/api` → For development

### **✅ Railway App URL Already Configured**

Your Railway app URL is already configured in `js/api-config.js`:
- **Current URL**: `https://hairelevationstudios-production.up.railway.app`
- **API Endpoint**: `https://hairelevationstudios-production.up.railway.app/api`

**Your Railway app URL:**
1. Go to Railway Dashboard
2. Select your backend service
3. Copy the domain (e.g., `https://my-app-abc123.railway.app`)

---

## 🚀 **Deployment Steps:**

### **1. Update Railway Environment Variables**
Add the CORS_ORIGIN variable above to your Railway backend service.

### **2. Get Your Railway App URL**
After deployment, copy your Railway app domain.

### **3. Frontend Configuration Updated**
Your `js/api-config.js` is already configured with the correct Railway URL.

### **4. Deploy Frontend to GitHub Pages**
```bash
git add js/api-config.js
git commit -m "Update API configuration for production domains"
git push origin main
```

---

## 🌐 **Domain Configuration:**

### **Current Setup:**
- **Frontend**: GitHub Pages (https://dromorongit.github.io/HairElevationStudios/)
- **Backend**: Railway (https://hairelevationstudios-production.up.railway.app)

### **After Custom Domain:**
- **Frontend**: www.hairelevationstudio.com
- **Backend**: hairelevationstudios-production.up.railway.app

### **CORS Domains Allowed:**
- ✅ `http://localhost:3000` (development)
- ✅ `http://localhost:8080` (development)
- ✅ `http://localhost:5500` (development)
- ✅ `https://dromorongit.github.io` (GitHub Pages)
- ✅ `https://www.hairelevationstudio.com` (custom domain)
- ✅ `https://hairelevationstudio.com` (custom domain without www)

---

## ✅ **Expected Results:**

After configuration:
1. **GitHub Pages frontend** connects to Railway backend
2. **Custom domain** connects to Railway backend
3. **Admin interface** accessible at Railway app root URL
4. **Product management** works from both domains
5. **File uploads** work across all domains
6. **Custom admin account creation** (no default credentials)
7. **Account deletion** capability for system reset

**Your Hair Elevation Studios website will be fully functional with secure admin management!** 🎉

---

## 🔧 **Troubleshooting:**

### **If CORS errors occur:**
- Verify CORS_ORIGIN includes your exact domain
- Check Railway deployment logs for errors
- Ensure frontend is using correct Railway backend URL

### **If API calls fail:**
- Confirm Railway app is deployed and running
- Check health endpoint: `https://hairelevationstudios-production.up.railway.app/health`
- Verify API configuration in frontend