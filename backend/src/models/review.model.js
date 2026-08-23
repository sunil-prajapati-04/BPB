import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewerName:{
        type:String,
    },
    rating:{
        type:Number,
    },
    reviewText:{
        type:String
    },
    googleMapsUrl:{
        type:String
    }
},{timestamps:true})


const reviewCollection = mongoose.model('reviewCollection',reviewSchema);
export default reviewCollection;