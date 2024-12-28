import express from "express";
import {   addMaintainance,viewMaintainance,viewIsues  } from "../controller/maintainance.controller.js";
import { protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// wait 
router.post("/add-maintenance",protectRouteForAdmin,addMaintainance)
router.get("/view-all-maintenance",protectRouteForAdmin,viewMaintainance)
router.get("/view-issues",protectRouteForAdmin,viewIsues)




export default router;