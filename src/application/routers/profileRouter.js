import express from "express";
import ProfileController from "../controllers/profileController/index.js";

const router = express.Router();
const profileController = new ProfileController();

// router.post("/", profileController.createProfile);
router.get("/", profileController.getProfile);
router.put("/update", profileController.updateProfile);
router.post("/upload-picture", profileController.uploadProfilePicture); 
router.get("/:id", profileController.getProfileById);
router.get("/:id/followers", profileController.getFollowers); // takip edenleri getir
router.get("/:id/following", profileController.getFollowing); // takip edilenler


export default router;
