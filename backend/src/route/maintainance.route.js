import express from "express";
import {   addMaintainance,viewMaintainance,reportIssue  } from "../controller/maintainance.controller.js";
import {  protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// wait 
router.post("/add-maintainance",protectRouteForAdmin,addMaintainance)
router.get("/view-all-maintainance",protectRouteForAdmin,viewMaintainance)
router.post("/report-issue",protectRouteForAdmin,reportIssue)




export default router;