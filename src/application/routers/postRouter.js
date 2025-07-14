// src/application/routers/postRouter.js
import express from "express";
import PostController from "../controllers/postController/index.js";

const router = express.Router();
const postController = new PostController();

router.post("/add", postController.addPost);
router.get("/:id", postController.getPostById);
router.put("/update/:postId", postController.updatePost);

// Kendi postlarını getir (token ile userId alınacak)
// router.get("/my-posts", postController.getMyPosts);
// router.get("/profile/:profileId/posts", postController.getPostsByProfile);

export default router;
