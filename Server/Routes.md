# 📂 Backend Folder Structure – Bitly Clone (MERN)
```
backend/
│── .env → Environment variables (PORT, DB_URI, JWT_SECRET, etc.)
│── package.json → Project dependencies & scripts
│── server.js → Entry point (Express app)
│
├── config/
│ └── db.js → MongoDB connection setup
│
├── middleware/
│ ├── authMiddleware.js → JWT + cookie-based authentication check
│ ├── errorHandler.js → Centralized error handling
│ └── rateLimiter.js → Request limiting with express-rate-limit
│
├── models/
│ ├── User.js → User schema (auth, profile, roles)
│ ├── Url.js → URL schema (short/long URLs, metadata)
│ ├── Click.js → Analytics schema (IP, location, device, referrer)
│ └── Team.js → Teams & collaboration schema
│
├── routes/
│ ├── authRoutes.js → Auth APIs (login, register, logout, refresh)
│ ├── urlRoutes.js → URL APIs (shorten, redirect, manage URLs)
│ ├── analyticsRoutes.js → Analytics APIs (clicks, geo, device stats)
│ ├── teamRoutes.js → Team & collaboration APIs
│ └── qrRoutes.js → QR code generation API
│
├── controllers/
│ ├── authController.js → Handles login/register/logout logic
│ ├── urlController.js → Create short URLs, handle redirects
│ ├── analyticsController.js → Collect & fetch analytics
│ ├── teamController.js → Team creation & management
│ └── qrController.js → QR code generation logic
│
├── services/
│ ├── geoService.js → IP → Geo lookup (ip-api / ipinfo)
│ ├── qrService.js → QR code generator logic (qrcode library)
│ ├── slugService.js → AI/human-readable slug generator
│ └── healthService.js → Link health monitoring (dead/broken links)
│
├── utils/
│ ├── generateToken.js → JWT token creation & refresh
│ ├── validateUrl.js → URL validation & normalization
│ └── logger.js → App logging (Winston / Morgan)
│
└── logs/
└── app.log → Application logs (optional)
```