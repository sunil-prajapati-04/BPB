import Review from '../models/review.model.js';
import {serverError, badRequest, notFound} from '../lib/error.js';
import cloudinary from '../lib/cloudinary.js';

export const createReview = async (req, res) => {
    try {
        if(req.admin.role !== 'Boss' && req.admin.role !== 'admin'){
            return badRequest(res,"You are not authorized to create review");
        }
        const { reviewerName, rating, reviewText, googleMapsUrl } = req.body;
        
        const newReview = new Review({
            reviewerName,
            rating,
            reviewText,
            googleMapsUrl
        });
        await newReview.save();
        return res.status(201).json({ message: 'Review created successfully', review: newReview});
    } catch (error) {
        console.log("error in createReview controller", error);
        return serverError(res, error);
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        return res.status(200).json({ data: reviews });
    } catch (error) {
        console.log("error in getAllReviews controller", error);
        return serverError(res, error);
    }
}

export const deleteReview =  async (req, res) => {
    try {
        if(req.admin.role !== 'Boss' && req.admin.role !== 'admin'){
            return badRequest(res,"You are not authorized to delete review");
        }
        const { reviewId } = req.params;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return notFound(res, "Review not found");
        }
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.log("error in deleteReview controller", error);
        return serverError(res, error);
    }
}

export const updateReview = async (req, res) => {
    try {
        if(req.admin.role !== 'Boss' && req.admin.role !== 'admin'){
            return badRequest(res,"You are not authorized to update review");
        }
        const { reviewId } = req.params;
        const updatedReviewData = req.body;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedReviewData); 
        if (!updatedReview) {
            return notFound(res, "Review not found");
        }
        return res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        console.log("error in updateReview controller", error);
        return serverError(res, error);
    }
}
