# Hair Elevation Studios - Admin System

A comprehensive admin system for Hair Elevation Studios, featuring a Node.js backend with MongoDB and a web-based admin interface for managing products, collections, and media.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **RESTful API** with full CRUD operations
- **Authentication system** with JWT tokens
- **File upload system** for images and videos using Multer
- **MongoDB integration** with Mongoose ODM
- **Input validation** and error handling
- **CORS support** for frontend integration
- **File management** with local storage

### Admin Interface
- **Product Management**: Add, edit, delete products with comprehensive fields
- **Collection Management**: Organize products into collections
- **Featured Products**: Manage homepage featured products
- **Inventory Management**: Track stock levels and availability
- **Media Library**: Upload and manage images and videos
- **Real-time Dashboard**: Statistics and analytics
- **Responsive Design**: Works on desktop and mobile devices

### Frontend Integration
- **API-based data loading**: Fetches products from backend instead of hardcoded data
- **Dynamic collections**: Real-time collection data
- **Error handling**: Graceful fallbacks when API is unavailable
- **Caching**: Improved performance with intelligent caching
- **Stock management**: Shows availability status

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **HTML5** - Semantic markup
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Admin Interface
- **Responsive Design** - Mobile-first approach
- **Tabbed Interface** - Organized functionality
- **Drag & Drop** - File uploads
- **Real-time Updates** - Dynamic content
- **Form Validation** - Client and server-side validation

## 📁 Project Structure

```
HairElevationStudios/
├── backend/
│   ├── models/           # MongoDB schemas
│   │   ├── Product.js    # Product model
│   │   └── Admin.js      # Admin user model
│   ├── routes/           # API routes
│   │   ├── auth.js       # Authentication routes
│   │   ├── products.js   # Product CRUD routes
│   │   └── upload.js     # File upload routes
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # Authentication middleware
│   │   └── errorHandler.js # Error handling
│   ├── public/
│   │   ├── admin/        # Admin interface
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── admin-styles.css
│   │   │   └── js/
│   │   │       └── admin.js
│   │   └── css/
│   ├── uploads/          # File storage
│   │   ├── images/       # Product images
│   │   └── videos/       # Product videos
│   ├── server.js         # Main server file
│   ├── package.json      # Dependencies
│   └── .env.example      # Environment variables template
├── js/                   # Frontend JavaScript
│   ├── api-config.js     # API configuration
│   ├── api-service.js    # API service layer
│   └── main.js           # Main frontend logic
├── css/
│   └── styles.css        # Main stylesheet
├── *.html               # Frontend pages
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/hair-elevation-admin
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hair-elevation-admin
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   
   # Admin Configuration
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ADMIN_EMAIL=admin@hairelevationstudio.com
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the admin interface**
   - Open http://localhost:5000/admin in your browser
   - Default login: username `admin`, password `admin123`

### Frontend Setup

The frontend is served as static files. Simply open the HTML files in a web browser or serve them using a simple HTTP server:

```bash
# Using Python (if installed)
python -m http.server 8080

# Using Node.js (if http-server is installed)
npx http-server -p 8080

# Using PHP (if installed)
php -S localhost:8080
```

Then open http://localhost:8080 in your browser.

**Important**: Update the `API_CONFIG.BASE_URL` in `js/api-config.js` to point to your backend server:
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## 📊 API Documentation

### Authentication
All admin endpoints require authentication via JWT token.

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "admin": { /* admin user data */ },
    "token": "jwt_token_here"
  }
}
```

### Products

#### Get All Products
```http
GET /api/products?page=1&limit=10&collection=bridal-crowns&featured=true&search=wig
Authorization: Bearer jwt_token_here
```

#### Get Single Product
```http
GET /api/products/:id
Authorization: Bearer jwt_token_here
```

#### Create Product
```http
POST /api/products
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Glueless Wig Model A",
  "price": 500,
  "description": "Premium glueless wig...",
  "size": "medium",
  "collections": ["bridal-crowns"],
  "coverImage": "/uploads/images/wig-image.jpg",
  "inStock": true,
  "featured": true
}
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "price": 550,
  "featured": false
}
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer jwt_token_here
```

### File Upload

#### Upload Single File
```http
POST /api/upload/single
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

file: [binary file data]
```

#### Upload Multiple Files
```http
POST /api/upload/multiple
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

files: [array of binary files]
```

#### Upload Product Images
```http
POST /api/upload/product-images
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

coverImage: [binary image]
additionalImages: [array of binary images]
```

## 🎯 Admin Interface Guide

### Dashboard
- View total products, featured products, stock status
- Quick statistics and metrics

### Products Management
- **Add New Product**: Comprehensive form with all product fields
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation
- **Filter & Search**: Find products by name, collection, or stock status
- **Pagination**: Browse through large product lists

### Collections Management
- View all collections with product counts
- Navigate to collection-specific products

### Featured Products
- Manage products displayed on homepage
- Toggle featured status
- Reorder featured products

### Inventory Management
- Track stock levels
- Update quantities
- Mark products as in/out of stock
- Filter by stock status

### Media Library
- Upload images and videos
- View all uploaded media
- Delete unused files
- Drag & drop upload support

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/hair-elevation-admin |
| `JWT_SECRET` | JWT signing secret | your-super-secret-jwt-key-change-this-in-production |
| `JWT_EXPIRE` | JWT expiration time | 30d |
| `ADMIN_USERNAME` | Default admin username | admin |
| `ADMIN_PASSWORD` | Default admin password | admin123 |
| `ADMIN_EMAIL` | Default admin email | admin@hairelevationstudio.com |
| `MAX_FILE_SIZE` | Maximum file upload size | 10485760 (10MB) |
| `UPLOAD_PATH` | File upload directory | ./uploads |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:3000,http://localhost:8080 |

### Frontend Configuration

Update `js/api-config.js` for your deployment:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-backend-domain.com/api', // Update this
    // ... rest of config
};
```

## 🐛 Fixes & Updates

### Recent Fixes (v1.0.1)
- **Fixed middleware import error**: Corrected auth middleware import in server.js
- **Updated package.json**: Fixed production warning by setting NODE_ENV in start script
- **Enhanced error handling**: Improved error logging for better debugging

## 🚀 Deployment

### Backend Deployment (Railway)

1. **Create Railway Account**: Sign up at [railway.app](https://railway.app)

2. **Create New Project**:
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

3. **Add MongoDB**:
   ```bash
   railway add mongodb
   ```

4. **Set Environment Variables**:
   ```bash
   railway variables set JWT_SECRET=your-production-secret
   railway variables set NODE_ENV=production
   railway variables set ADMIN_USERNAME=admin
   railway variables set ADMIN_PASSWORD=secure-password
   railway variables set ADMIN_EMAIL=your@email.com
   ```

5. **Deploy**:
   ```bash
   railway up
   ```

6. **Get Database URL**: Railway will provide a MongoDB connection string automatically.

### Frontend Deployment

#### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

1. **Update API Configuration**:
   ```javascript
   BASE_URL: 'https://your-railway-app.railway.app/api'
   ```

2. **Deploy Files**:
   - Upload all HTML, CSS, JS files to your hosting provider
   - Ensure all file paths are correct

#### Option 2: Traditional Web Hosting

1. **Upload Files**:
   - Upload all frontend files to your web server
   - Ensure the backend API URL is correctly configured

## 🧪 Testing

### Backend Testing

1. **Start the server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Test API endpoints** using curl or Postman:
   ```bash
   # Test health endpoint
   curl http://localhost:5000/health

   # Test login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

### Frontend Testing

1. **Start a local server**:
   ```bash
   python -m http.server 8080
   ```

2. **Open in browser**:
   - Navigate to http://localhost:8080
   - Test product loading and admin functionality

## 🔒 Security Considerations

- **Change default passwords** in production
- **Use strong JWT secrets** in production
- **Enable HTTPS** in production
- **Configure CORS** properly for your domain
- **Validate file uploads** and implement size limits
- **Use environment variables** for sensitive data
- **Implement rate limiting** for production use

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally
   - Check connection string in .env file
   - For MongoDB Atlas, ensure IP whitelist includes your IP

2. **CORS Errors**:
   - Check CORS_ORIGIN environment variable
   - Ensure frontend domain is allowed

3. **File Upload Issues**:
   - Check upload directory permissions
   - Verify file size limits
   - Ensure correct MIME types

4. **Admin Login Fails**:
   - Verify credentials in environment variables
   - Check if default admin was created

### Debug Mode

Enable detailed error logging:
```bash
NODE_ENV=development npm run dev
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

## 🎉 Features in Development

- [ ] Order management system
- [ ] Customer management
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Product variants
- [ ] Discount codes
- [ ] Inventory alerts

---

**Hair Elevation Studios Admin System** - Professional product management for luxury wigs and hair extensions.