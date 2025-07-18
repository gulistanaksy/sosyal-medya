import express from "express";
import FollowRequestController from "../controllers/followRequestController/index.js";

const router = express.Router();
const controller = new FollowRequestController();

router.post("/add", controller.addFollowRequest);
router.put("/update", controller.updateFollowRequest);
router.get("/", controller.getFollowRequest);
router.delete("/cancel", controller.cancelFollowRequest); 
router.delete("/unfollow", controller.unfollow);   

export default router;
