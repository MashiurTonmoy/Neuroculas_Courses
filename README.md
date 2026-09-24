# 🎓 Neuroculas Courses

> An open community platform to create, discover, reuse, and refine learning materials and digital assets — so no knowledge gets generated twice.

---

## 🌟 Key Features

- **📚 Community Learning Materials**: Discover, download, and share educational resources, courses, document archives, and study notes.
- **⚡ Enforced 10 MB File Limit**: Complete client-side and server-side Multer validation restricting uploads to 10 MB max (PDF, DOCX, PPTX, XLSX, ZIP, TXT).
- **👥 Users Directory**: Live user search by name with single-line user rows displaying avatar/logo, full name, and uploaded files count (`X files uploaded`).
- **🔐 User & Admin Permissions**:
  - **Verified Creators**: Upload learning content and manage/delete their own uploaded files.
  - **Admins**: Access Moderation Queue to approve or reject pending submissions, plus global deletion authority over all files.
- **📱 Fully Responsive Design**: Mobile navigation drawer with authenticated user profile card, direct Profile access above Dashboard, Upload CTA, and Admin tools.
- **🔝 Automatic Scroll Restoration**: Router integration automatically resets scroll position to top on page navigation (`ScrollToTop`).
- **🎨 Custom Neuroculas Theme**: Modern typography, sharp color palettes, custom drop zones, and dynamic file type icons.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **UI & Icons**: Material UI (MUI v5) & MUI Icons
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js + Express.js (v5)
- **Database**: MongoDB + Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS password hashing
- **File Handling**: Multer & Cloudinary Storage Integration
- **Payments**: Stripe API Integration
- **Security & Logging**: Express Rate Limiting & Morgan Logging

---

## 📂 Project Structure

```
Neuroculas_Courses/
├── client/                     # Frontend Application (Vite + React + TS)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, FileTypeIcon, ScrollToTop, UploadModal, etc.
│   │   ├── context/            # AuthContext & State Providers
│   │   ├── pages/              # HomeFeed, Explore, CourseDetail, Users, Profile, Dashboard, Admin
│   │   ├── services/           # API Services (courseService, userService, authService, adminService)
│   │   ├── theme/              # Custom MUI Theme & Colors
│   │   ├── types/              # TypeScript Interfaces (Course, User, Purchase)
│   │   └── App.tsx             # Main Router & Application Root
│   └── package.json
│
├── server/                     # Backend Application (Node.js + Express)
│   ├── config/                 # DB Connection (db.js)
│   ├── controllers/            # authController, courseController, userController, adminController
│   ├── middleware/             # protect, checkAccess, errorHandler
│   ├── models/                 # Mongoose Models (User, Course, Purchase, Review)
│   ├── routes/                 # authRoutes, courseRoutes, userRoutes, adminRoutes, paymentRoutes
│   ├── server.js               # Express Application Server Entry
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm** or **yarn**
- **MongoDB Database**: Local instance or MongoDB Atlas URI

---

### Installation & Environment Setup

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/Neuroculas_Courses.git
cd Neuroculas_Courses
```

#### 2. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend server in development mode:
```bash
npm run dev
```

#### 3. Frontend Setup
Open a new terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login user and return JWT | Public |
| **GET** | `/api/auth/me` | Get current logged-in user profile | Protected |
| **GET** | `/api/users` | Get all users or search users by name (`?q=name`) | Public |
| **GET** | `/api/courses` | Browse & search approved courses | Public |
| **GET** | `/api/courses/:id` | Get course details | Public |
| **POST** | `/api/courses` | Upload new course material (Max 10 MB) | Protected |
| **DELETE** | `/api/courses/:id` | Delete course (Owner or Admin only) | Protected |
| **GET** | `/api/courses/my-uploads` | Get courses uploaded by current user | Protected |
| **GET** | `/api/admin/pending` | View pending moderation queue | Admin |
| **PATCH** | `/api/admin/approve/:id` | Approve pending course material | Admin |

---

## 📝 License

This project is licensed under the ISC License.
