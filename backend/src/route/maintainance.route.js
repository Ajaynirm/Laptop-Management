import express from "express";
import {   addMaintainance,viewMaintainance,viewIsues,findUnassignedLaptopsInMaintenance  } from "../controller/maintainance.controller.js";
import { protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/add-maintenance",protectRouteForAdmin,addMaintainance)
router.get("/view-all-maintenance",protectRouteForAdmin,viewMaintainance)
router.get("/view-issues",protectRouteForAdmin,viewIsues)
router.get("/get-not-assigned",protectRouteForAdmin,findUnassignedLaptopsInMaintenance)





export default router;


