import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { getUserByID } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user/:id", getUserByID);

export default router;