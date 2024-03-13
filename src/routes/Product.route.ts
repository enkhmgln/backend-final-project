import { Router } from "express";
import productController from "../controller/Product.controller";

const router = Router({ mergeParams: true });

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/products/:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       products: []
 *       200:
 *         description: products []
 */

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

/**
 * @openapi
 * /api/products/{productId}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to get
 *     responses:
 *       200:
 *         description: Retrieved product
 *   put:
 *     tags:
 *       - Product
 *     summary: Update a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     responses:
 *       200:
 *         description: Updated product
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Deleted product
 */

router
  .route("/:productId")
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
