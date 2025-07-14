import express from "express";
import CommentController from "../controllers/commentController/index.js";

const router = express.Router();
const commentController = new CommentController();

router.post("/add", commentController.addComment);
router.put("/update/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.deleteComment);

export default router;
