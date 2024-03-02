import { Router } from "express";
import {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controller/productController";
// өөр route - ээс орж ирсэн parameter - ийг хүлээж авах чадвартай болгоно
const router = Router({ mergeParams: true });

router.route("/").get(getProducts).post(createProduct);
router
  .route("/:productId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
