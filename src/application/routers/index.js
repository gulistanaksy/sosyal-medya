import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// .env dosyasını yükle
dotenv.config();

// Router, Controller, Util
import UserController from "../controllers/userController/index.js";
import decryptToken from "../../../core/utils/token.js";

// Alt router'lar
import userRouter from "./userRouter.js";
import profileRouter from "./profileRouter.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js";
// import likeRouter from "./likeRouter.js";
// import followRequestRouter from "./followRequestRouter.js";

const router = express.Router();
const prisma = new PrismaClient();
const userController = new UserController();

// Ortamdan JWT secret'ı al
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Public Routes
router.post("/register", userController.userCreate);
router.post("/login", userController.login);

// ✅ Middleware: JWT Token doğrulama
router.use(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Erişim reddedildi." });
  }

  try {
    req.userId = await decryptToken(token);

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Geçersiz kullanıcı." });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Geçersiz token." });
  }
});

// ✅ Basit test endpoint'i
router.get("/", (req, res) => {
  res.send("merhaba");
});

// ✅ Protected routes
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
// router.use("/like", likeRouter);
// router.use("/followRequest", followRequestRouter);

export default router;
