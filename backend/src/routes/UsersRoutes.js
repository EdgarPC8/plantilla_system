import { Router } from "express";
import {
    getUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUserData
} from "../controllers/UserController.js";
import { 
    deletePhoto,
    uploadPhoto 
} from "../middlewares/uploadPhotoMiddleware.js";

const router = new Router();

router.get("/:userId", getOneUser);
router.put("/:userId",updateUserData);
router.put(
  "/photo/:userId",
  uploadPhoto
);
router.post("", addUser);
router.get("", getUsers);
router.delete("/:userId", deleteUser);
router.delete("/photo/:userId", deletePhoto);

export default router;
