import express from "express";
import {   addMaintainance,viewMaintainance,reportIssue,viewIsues  } from "../controller/maintainance.controller.js";
import {  protectRouteForEmployee,protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// wait 
router.post("/add-maintainance",protectRouteForAdmin,addMaintainance)
router.get("/view-all-maintainance",protectRouteForAdmin,viewMaintainance)
router.post("/report-issue",protectRouteForEmployee,reportIssue)
router.get("/view-issues",protectRouteForAdmin,viewIsues)




export default router;