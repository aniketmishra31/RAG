import { Router } from "express";
import isAuth from "../middleware/verifyJwt";
import { generateApiKey, getAllDocs, getDoc } from "../controllers/documentController";
const router = Router();

router.get("/all-pdfs", isAuth, getAllDocs);
router.get("/pdf/:id", isAuth, getDoc);
router.get("/pdf/api-key/:id", isAuth, generateApiKey);
export default router;