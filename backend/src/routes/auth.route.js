import express from 'express';
import {login,logout,myProfile} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login',login);
router.post('/logout',authMiddleware,logout);
router.get('/profile',authMiddleware,myProfile);

export default router;

