import express from "express";
import userController from "../controller/User.controller";

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Шинэ хэрэглэгч бүртгэх
 *     parameters:
 *       - in: formData
 *         name: name
 *         required: true
 *         type: string
 *         description: Хэрэглэгчийн нэр
 *       - in: formData
 *         name: password
 *         required: true
 *         type: string
 *         format: password
 *         description: Нууц үг
 *     responses:
 *       200:
 *         description: амжилттай
 *     security: []
 */
router.post("/register", userController.createUser);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Хэрэглэгч нэвтрэх
 *     parameters:
 *       - in: formData
 *         name: name
 *         required: true
 *         type: string
 *         description: Хэрэглэгчийн нэр
 *       - in: formData
 *         name: password
 *         required: true
 *         type: string
 *         format: password
 *         description: Нууц үг
 *     responses:
 *       200:
 *         description: амжилттай
 *     security: []
 */
router.post("/login", userController.loginUser);

/**
 * @openapi
 * /api/auth/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Retrieved users
 *     security:
 *       - bearerAuth: []
 */
router.get("/users", userController.getUsers);

export default router;
