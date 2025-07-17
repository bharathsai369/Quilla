import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

//middleware
app.use(
  cors({
    origin: [ALLOWED_ORIGIN],
  })
);
app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log(`req method is ${req.method} & req url is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}/`);
  });
});
