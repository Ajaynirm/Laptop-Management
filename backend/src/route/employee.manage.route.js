import express from "express";
import { getEmployee,assignLaptop,getAssignedLaptop } from "../controller/employee.manage.controller.js"; 
import { protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();
// get employees, assign laptop , fetch laptop assigned to employees - Api for Employee management (this can only done by admin)
router.get("/get-emp",protectRouteForAdmin,getEmployee)
router.post("/assign-laptop",protectRouteForAdmin,assignLaptop)
router.get("/get-assigned",protectRouteForAdmin,getAssignedLaptop)



export default router;