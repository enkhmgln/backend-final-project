import express from "express";
import { createUser, loginUser, getUsers } from "../controller/userController";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);

export default router;
