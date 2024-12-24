import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";
import Employee from "../model/employee.model.js";

export const protectRouteForAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findById(decoded.userId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // check it 
    req.admin = admin;

    next();
  } catch (error) {
    console.log("Error in admin protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const protectRouteForEmployee = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const employee = await Employee.findById(decoded.userId).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    req.employee = employee;

    next();
  } catch (error) {
    console.log("Error in employee protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


