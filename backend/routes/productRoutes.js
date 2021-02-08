import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

// Get all products from productController
router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.get("/top", getTopProducts);

// Get individual product from productController
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
