import express from "express";
import userController from "../controller/User.controller";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);

export default router;
