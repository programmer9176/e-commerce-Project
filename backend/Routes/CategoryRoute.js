import express from "express";
import { CreateCategoryController } from "../Controllers/CategoryController.js";
import { isAdmin } from "../Controllers/authControllers.js";
import { requireSignin } from "../Middelwares/AuthMiddleware.js";

const router = express.Router();

// The correct order of middleware should be:
// 1. requireSignin: to check if the user is authenticated
// 2. isAdmin: to check if the user is an admin
router.post("/create-category", requireSignin, isAdmin, CreateCategoryController);

export default router;
