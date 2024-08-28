import express from "express";
import { AllCategoryController, CreateCategoryController, DeleteCategoryController, SingleCategoryController, UpdateCategoryController } from "../Controllers/CategoryController.js";
import { isAdmin } from "../Controllers/authControllers.js";
import { requireSignin } from "../Middelwares/AuthMiddleware.js";

const router = express.Router();

router.post("/create-category", requireSignin, isAdmin, CreateCategoryController);

router.get("/all-category", AllCategoryController);


router.get("/single-category/:slug", SingleCategoryController);

router.put("/update-category/:id", UpdateCategoryController);

router.delete("/delete-category/:id", DeleteCategoryController);

export default router;
