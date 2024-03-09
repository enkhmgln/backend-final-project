import { Router } from "express";
import productController from "../controller/Order.controller";
// өөр route - ээс орж ирсэн parameter - ийг хүлээж авах чадвартай болгоно
const router = Router({ mergeParams: true });

router.route("/create").post(productController.createOrder);

export default router;
