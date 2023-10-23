import express from "express";
import {
  loginUserController,
  registerUserController,
  getLoggedInUserController,
} from "../controllers/userController";

const router = express.Router();

/* We are issuing JWTs in both these routes */
router.post("/login", loginUserController);
router.post("/register", registerUserController);
router.get("/:userId", getLoggedInUserController);

export default router;
