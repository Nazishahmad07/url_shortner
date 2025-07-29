# URL Shortener - MERN Stack Application

A full-stack URL shortening application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, profile management, and URL analytics.

## Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Profile management with avatar support
- Password change functionality
- Account deletion

### 🔗 URL Shortening
- Create short, memorable URLs
- Custom titles and descriptions
- Tag-based organization
- URL expiration dates
- Click tracking and analytics
- URL status management (active/inactive)

### 📊 Dashboard & Analytics
- Real-time statistics dashboard
- Click tracking for each URL
- Search and filter URLs
- URL performance metrics
- User statistics overview

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful and intuitive interface
- Toast notifications
- Loading states and animations
- Mobile-friendly design

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **nanoid** - URL short code generation
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in your `.env` file.

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```

2. **Start the React development server**
   ```bash
   cd client
   npm start
   ```

3. **Or run both simultaneously**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Mode

1. **Build the React app**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user

### URLs
- `POST /api/urls` - Create new URL
- `GET /api/urls` - Get user's URLs
- `GET /api/urls/:id` - Get specific URL
- `PUT /api/urls/:id` - Update URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /api/urls/redirect/:shortCode` - Redirect to original URL

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/password` - Change password
- `GET /api/profile/stats` - Get user statistics
- `DELETE /api/profile` - Delete account

## Project Structure

```
url-shortener/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── models/                 # MongoDB models
│   ├── User.js
│   └── Url.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── urls.js
│   └── profile.js
├── middleware/             # Custom middleware
│   └── auth.js
├── server.js              # Express server
├── package.json
└── README.md
```

## Features in Detail

### URL Shortening
- Generate unique 8-character short codes
- Support for custom titles and descriptions
- Tag-based organization
- Optional expiration dates
- Click tracking and analytics

### User Dashboard
- Overview of all created URLs
- Real-time statistics
- Search and filter functionality
- Bulk URL management
- Performance metrics

### Profile Management
- Update personal information
- Change password securely
- Upload avatar via URL
- View account statistics
- Account deletion

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Rate limiting (can be added)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Happy URL Shortening! 🚀** 
