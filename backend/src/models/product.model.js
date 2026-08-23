import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sku:{
        type:String,
        required:true,
        unique:true 
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    photo:[
        {
            url:{
                type:String
            },
            public_Id:{
                type:String
            }
        }
    ]
},{timestamps:true})

const productCollection = mongoose.model('productCollection',productSchema);
export default productCollection;