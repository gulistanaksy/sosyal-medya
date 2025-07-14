import express from "express";
import LikeController from "../controllers/likeController/index.js";

const router = express.Router();
const likeController = new LikeController();

// Toggle (ekle/kaldır)
router.post("/toggle/:postId", likeController.toggleLike);

export default router;
