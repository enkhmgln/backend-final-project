import { Router } from "express";
import productController from "../controller/Product.controller";
// өөр route - ээс орж ирсэн parameter - ийг хүлээж авах чадвартай болгоно
const router = Router({ mergeParams: true });

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router
  .route("/:productId")
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
