import express from "express";
import {  addLaptop, 
         updateLaptop, deleteLaptop,
         getAllLaptop,getAllLaptopId   } from "../controller/laptop.manage.controller.js";
import {  protectRouteForAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// add , update , delete laptop only by admin  - api for laptop management
router.post("/add-laptop",protectRouteForAdmin,addLaptop)
router.post("/update-laptop",protectRouteForAdmin,updateLaptop)
router.post("/delete-laptop",protectRouteForAdmin,deleteLaptop)
router.get("/get-all-laptop",protectRouteForAdmin,getAllLaptop)
router.get("/get-all-laptop-id",protectRouteForAdmin,getAllLaptopId)



export default router;