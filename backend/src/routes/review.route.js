import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {createReview, getAllReviews, deleteReview, updateReview} from '../controllers/review.controller.js';


const router = express.Router();

router.post('/create',authMiddleware,createReview);  //admin
router.get('/all',getAllReviews);
router.delete('/delete/:reviewId',authMiddleware,deleteReview);  //admin
router.put('/update/:reviewId',authMiddleware,updateReview);  //admin

export default router;