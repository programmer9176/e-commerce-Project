import express from "express"
import { isAdmin } from '../Controllers/authControllers.js';
import formidable from 'express-formidable'
import { CreateProductController, DeleteProductController, GetProductController, GetSingleProductController, ProductPhotoController, UpdateProductController } from "../Controllers/ProductController.js";
import { requireSignin } from "../Middelwares/AuthMiddleware.js";

const router = express.Router();

router.post("/create-product", requireSignin, isAdmin, formidable(), CreateProductController)

router.get("/get-product", GetProductController)


router.get("/single-product/:slug", GetSingleProductController)

router.delete("/delete-product/:id", DeleteProductController)


router.put("/update-product/:id", requireSignin, isAdmin, formidable(), UpdateProductController)


router.get("/product-photo/:id", ProductPhotoController)


export default router;