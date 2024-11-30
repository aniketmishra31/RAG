import { Router } from "express";
import isAuth from "../middleware/verifyJwt";
import { getAllDocs } from "../controllers/documentController";
const router = Router();

router.get("/all-pdfs", isAuth, getAllDocs);

export default router;