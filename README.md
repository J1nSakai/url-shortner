# 🔗 URL Shortener

A modern, full-stack URL shortening service built with React and Node.js. Create short, shareable links with custom slugs, track click analytics, and manage your URLs with a beautiful dashboard.

## ✨ Features

### 🚀 Core Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Slugs**: Create personalized short URLs with custom slugs (authenticated users)
- **Click Analytics**: Track click counts
- **User Dashboard**: Manage all your shortened URLs in one place
- **Copy to Clipboard**: One-click copying with visual feedback

### 🔐 Authentication & Security

- **User Registration & Login**: Secure JWT-based authentication
- **Protected Routes**: Dashboard and custom features require authentication
- **Secure Cookies**: HTTP-only cookies with proper security settings
- **Password Hashing**: Secure password storage
- **CORS Protection**: Configured for secure cross-origin requests

### 🎨 User Experience

- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Comprehensive error messages and retry options
- **Real-time Updates**: Automatic cache invalidation and updates

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management and caching
- **Redux Toolkit** - Client state management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client with interceptors

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
url-shortener/
├── FRONTEND/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── UrlForm.jsx
│   │   │   ├── UserUrlList.jsx
│   │   │   └── NavBar.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── Auth.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useUserUrls.js
│   │   │   └── useCreateUrl.js
│   │   ├── store/           # Redux store and slices
│   │   │   ├── store.js
│   │   │   └── slice/
│   │   │       └── authSlice.js
│   │   ├── api/             # API layer
│   │   │   ├── user.api.js
│   │   │   └── shorturl.api.js
│   │   ├── routing/         # Route definitions
│   │   ├── utils/           # Utility functions
│   │   └── main.jsx         # Application entry point
│   └── package.json
├── BACKEND/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── shorturl.controller.js
│   │   ├── services/        # Business logic
│   │   │   ├── auth.service.js
│   │   │   └── shorturl.service.js
│   │   ├── dao/             # Data access objects
│   │   │   ├── user.dao.js
│   │   │   └── shorturl.js
│   │   ├── models/          # Database models
│   │   │   ├── user.model.js
│   │   │   └── shorturl.model.js
│   │   ├── routes/          # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── shorturl.route.js
│   │   ├── config/          # Configuration files
│   │   │   ├── config.js
│   │   │   └── mongodb.config.js
│   │   └── utils/           # Utility functions
│   │       └── helper.js
│   ├── middleware/          # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── attachUser.js
│   │   └── appError.js
│   ├── app.js              # Express app setup
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```
2. **Backend Setup**

   ```bash
   cd BACKEND
   npm install
   ```
3. **Frontend Setup**

   ```bash
   cd FRONTEND
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `BACKEND` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/url-shortener

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Application URL
APP_URL=http://localhost:3000

# CORS
FRONTEND_URL=http://localhost:5173
```

### Database Setup

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```
2. **The application will automatically create the required collections**

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd BACKEND
   npm run dev
   ```

   Server will run on `http://localhost:3000`
2. **Start the Frontend Development Server**

   ```bash
   cd FRONTEND
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`
3. **Open your browser** and navigate to `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints


| Method | Endpoint             | Description       | Auth Required |
| -------- | ---------------------- | ------------------- | --------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | User login        | No            |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### URL Management Endpoints


| Method | Endpoint             | Description              | Auth Required |
| -------- | ---------------------- | -------------------------- | --------------- |
| POST   | `/api/create`        | Create short URL         | No            |
| POST   | `/api/create/custom` | Create custom short URL  | Yes           |
| GET    | `/api/user/urls`     | Get user's URLs          | Yes           |
| GET    | `/:id`               | Redirect to original URL | No            |

### Request/Response Examples

**Create Short URL**

```bash
POST /api/create
Content-Type: application/json

{
  "url": "https://example.com/very-long-url"
}

Response:
{
  "shortUrl": "http://localhost:3000/abc123"
}
```

**User Registration**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
  "message": "Registration Successful"
}
```

## 🎯 Usage

### For Anonymous Users

1. Visit the homepage
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy and share your shortened URL

### For Registered Users

1. **Sign up** for an account or **log in**
2. Access the **Dashboard** to see all your URLs
3. Create URLs with **custom slugs**
4. **Track click analytics** for all your links
5. **Manage your URLs** from one central location

## 🔧 Development

### Available Scripts

**Backend**

```bash
npm start        # Start production server
```

**Frontend**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style & Linting

- ESLint configuration for consistent code style
- Prettier for code formatting
- Follow React and Node.js best practices

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Build and deploy to your preferred platform (Heroku, Railway, etc.)
3. Ensure MongoDB connection is configured for production

### Frontend Deployment

1. Update API endpoints in the frontend configuration
2. Build the production bundle: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred hosting platform

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
APP_URL=https://your-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

- [TanStack Query](https://tanstack.com/query) for excellent data fetching
- [TanStack Router](https://tanstack.com/router/latest) for seamless
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for flexible data storage

---

**Made with ❤️ by Taimoor**
