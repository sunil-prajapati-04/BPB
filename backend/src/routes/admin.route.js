import express from 'express';
import { addAdmin, deleteAdmin, getAllAdmins, updateAdmin } from '../controllers/admin.controller.js';
import upload from '../middlewares/multer.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// router.post('/bossReg',upload.single('adminPhoto'),superAdmin);
router.post('/add',upload.single('adminPhoto'),authMiddleware,addAdmin);  //superAdmin
router.get('/view',authMiddleware,getAllAdmins);  //superAdmin
router.put('/update/:id',authMiddleware,updateAdmin);  //superAdmin
router.delete('/delete/:id',authMiddleware,deleteAdmin); //superAdmin

export default router;  