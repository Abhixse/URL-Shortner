import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoutes from "./routes/User.route.js";
import urlRoutes from "./routes/Url.routes.js";
import clickRoutes from "./routes/click.routes.js";
import domainRoutes from "./routes/domain.routes.js"
import cors from "cors"

const app = express();


// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Express settings
app.disable("x-powered-by");
app.set("trust proxy", true);
app.set("etag", false);

// ✅ Helmet handles security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // only allow same-origin resources
      },
    },
    frameguard: { action: "deny" }, // X-Frame-Options: DENY
    hsts: { maxAge: 31536000, includeSubDomains: true }, // HSTS for 1 year
    referrerPolicy: { policy: "no-referrer" }, // Hide referrer
  })
);

// ❌ Yeh galat hai → app.set("x-content-type-options", "nosniff");
// ✅ Sahi way: Helmet's built-in middleware
app.use(helmet.noSniff());

// ❌ Yeh galat hai → app.set("x-xss-protection", "1; mode=block");
// ✅ Sahi way: Helmet’s xssFilter (modern browsers ignore this anyway)
app.use(helmet.xssFilter());

// ❌ Yeh galat hai → app.set("cross-origin-resource-policy", "same-origin");
// ✅ Sahi way:
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));


app.use('/api/user/', userRoutes);
app.use('/api/url/', urlRoutes);
app.use('/api/click/', clickRoutes);
app.use("/api/domains", domainRoutes);


export { app };
