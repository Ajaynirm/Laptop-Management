import express from "express";
import { AdminCheckAuth, EmployeeCheckAuth, AdminLogin,
         EmployeeLogin, logout, EmployeeSignup,
         AdminSignup,EmployeeSignupByAdmin } from "../controller/auth.controller.js";
import { protectRouteForEmployee, protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();
//signup adding admin and employee
router.post("/admin-signup", AdminSignup);
router.post("/employee-signup", EmployeeSignup);
router.post("/employee-admin-signup", EmployeeSignupByAdmin);
//Authenticate and validate user 
router.post("/admin-login", AdminLogin);
router.post("/employee-login", EmployeeLogin);
router.get("/logout", logout);


router.get("/check-admin", protectRouteForAdmin, AdminCheckAuth);
router.get("/check-employee", protectRouteForEmployee, EmployeeCheckAuth);


export default router;


