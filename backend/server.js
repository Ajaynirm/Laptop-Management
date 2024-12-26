import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { connectDB } from './src/lib/db.js';

import authRoutes from "./src/route/auth.route.js";
import employManageRoutes from './src/route/employee.manage.route.js'
import laptopRoute from './src/route/laptop.manage.route.js'
import maintainanceRoutes from './src/route/maintainance.route.js'


dotenv.config();

const port = process.env.PORT;
console.log(port)
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/manage",employManageRoutes);
app.use("/api/laptop", laptopRoute);
app.use("/api/maintain", maintainanceRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server is running on PORT:" + port);
  connectDB();
});
