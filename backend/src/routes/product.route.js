import express from 'express';
import { addProduct, deleteProduct, getCategories, getProduct, getProductByCat, getProductById, updateProductImages, deleteProductImage, updateProduct } from '../controllers/product.controller.js';
import upload from '../middlewares/multer.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/add',upload.array('photo',10),authMiddleware,addProduct);  //admin
router.get('/categories',getCategories);  
router.get('/view/:id',getProductById);
router.get('/view',getProduct); 
router.get('/search-by-category',getProductByCat);
router.put('/updateProductImage/:id',upload.array('photo',5),authMiddleware,updateProductImages);  //admin
router.delete('/deleteProductImage/:id',authMiddleware,deleteProductImage);  //admin
router.put('/update/:id',authMiddleware,updateProduct);  //admin
router.delete('/delete/:id',authMiddleware,deleteProduct); //admin

export default router;
