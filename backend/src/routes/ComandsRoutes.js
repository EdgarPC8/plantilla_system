import { Router } from "express";
import { getLogs } from "../controllers/ComandsController.js";
import { downloadBackup, insertData, saveBackup } from "../database/insertData.js";





const router = Router();

router.get("/getLogs", getLogs);
router.get("/saveBackup", saveBackup);
router.get("/downloadBackup", downloadBackup);
router.get("/reloadBD", insertData);

export default router;
