import express from "express";
import userController from "../controller/User.controller";

const router = express.Router();
/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Шинэ хэрэглэгч бүртгэх
 *     responses:
 *       200:
 *         description: Хэрэглэгч амжилттай бүртгэгдлээ
 *
 */
router.post("/register", userController.createUser);
/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Auth , login
 *     summary: Хэрэглэгч нэвтрэх
 *     responses:
 *       200:
 *         description: Хэрэглэгч амжилттай нэвтэрлээ
 */
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);

export default router;
