import express from "express";
import ProfileController from "../controllers/profileController/index.js";

const router = express.Router();
const profileController = new ProfileController();

// router.post("/", profileController.createProfile);
router.get("/", profileController.getProfile);
// router.put("/update", profileController.updateProfile);

export default router;
