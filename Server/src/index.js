import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server is running on port ${process.env.PORT}`);
  });
})
.catch((error) => {
  console.error("❌ Server failed to start:", error);
  process.exit(1);
});
