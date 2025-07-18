import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log(__dirname);
console.log(process.env.NODE_ENV);

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use("/api/notes", rateLimiter, notesRoutes);

if (
  process.env.NODE_ENV === "production" &&
  fs.existsSync(path.join(__dirname, "../../frontend/dist"))
) {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
