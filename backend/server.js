import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { connectDB } from "./src/lib/db.js";

import authRoutes from "./src/route/auth.route.js";
import employManageRoutes from "./src/route/employee.manage.route.js";
import laptopRoute from "./src/route/laptop.manage.route.js";
import maintainanceRoutes from "./src/route/maintainance.route.js";
import assignmentRoutes from "./src/route/assignment.route.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://laptop-management-phi.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/manage", employManageRoutes);
app.use("/api/laptop", laptopRoute);
app.use("/api/maintain", maintainanceRoutes);
app.use("/api/assignment", assignmentRoutes);


app.listen(port, () => {
  console.log("server is running on PORT:" + port);
  connectDB();
});
