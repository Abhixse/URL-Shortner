import rateLimit from "express-rate-limit";

// 🔗 Rate limiter for auth endpoints (login/register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// 🔗 Rate limiter for URL shortening

export const urlLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per hour
  message: {
    success: false,
    message: "Rate limit exceeded, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});