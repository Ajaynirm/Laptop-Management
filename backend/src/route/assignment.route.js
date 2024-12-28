import express from "express";
import {getEmployeeAssignment,getAllAssignment,reportIssue} from "../controller/assigment.manage.controller.js"
import {  protectRouteForEmployee} from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/getAssignment",protectRouteForEmployee,getEmployeeAssignment)
router.get("/getAllAssignment",protectRouteForEmployee,getAllAssignment)
router.post("/reportIssue",protectRouteForEmployee,reportIssue)


export default router;