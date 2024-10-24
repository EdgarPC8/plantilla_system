import { Router } from "express";
import { login, verifytoken } from "../controllers/AuthController.js";

const router = Router();

router.post("/login", login);
router.get("/getSession", verifytoken);

export default router;
