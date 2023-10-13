import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/userController";

const router = express.Router();

/* We are issuing JWTs in both these routes */
router.post("/login", loginUserController);
router.post("/register", registerUserController);

export default router;
