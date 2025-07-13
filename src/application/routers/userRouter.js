import express from 'express';
import UserController from '../controllers/userController/index.js';

const router = express.Router();
const userController = new UserController();

// Örnek endpoint: Kullanıcı bilgisi getirme
router.get('/', userController.getUser);

export default router;
