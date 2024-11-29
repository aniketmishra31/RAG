import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { getUser } from "../controllers/userController";
import isAuth from "../middleware/verifyJwt";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user", isAuth, getUser);

export default router;