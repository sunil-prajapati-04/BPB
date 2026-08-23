import cloudinary from "../lib/cloudinary.js";
import { badRequest, notFound, serverError } from "../lib/error.js";
import Products from "../models/product.model.js";


export const addProduct = async(req,res)=>{
    try {
        if(req.admin.role !== 'admin' && req.admin.role !== 'Boss'){
            return badRequest(res,"Only admin can add products");
        }
        const{sku,name,category,price,description} = req.body;
        if(!name || !category || !description){
            return badRequest(res,"Required fileds cannot be empty");
        }
        if(!req.files || req.files.length === 0){
            return badRequest(res,"Please upload atleast one Image");
        }
        const images = [];
        for(let file of req.files){
            const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const uploadedPhotoUrl = await cloudinary.uploader.upload(base64Image);
            images.push({
                url:uploadedPhotoUrl.secure_url,
                public_Id:uploadedPhotoUrl.public_id
            })
        }
        const newProduct = new Products({
            sku,
            name,
            category,
            price,
            description,
            photo:images
        })
        await newProduct.save();
        return res.status(200).json({product:newProduct,message:"Product added sucessfully"});
    } catch (error) {
        console.log("error in addProduct controller:",error);
        return serverError(res,error)
    }
}

export const getProduct = async(req,res)=>{
    try {
        const {name} = req.query;
        if(!name){
            const products = await Products.find().sort({createdAt:-1});
            return res.status(200).json(products);
        }
        const product = await Products.findOne({name});
        if(!product){
            return notFound(res,"Product not found");
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log("error in product controller:",error);
        return serverError(res,error);
    }
}


export const getProductById = async(req,res)=>{
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId);
        if(!product){
            return notFound(res,"Product not found");
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log("error in getProductById controller:",error);
        return serverError(res,error);
    }
}

export const getCategories = async(req,res)=>{
    try {
        const categories = await Products.distinct("category");
        return res.status(200).json(categories.filter(Boolean));
    } catch (error) {
        console.log("error in getCategories controller:",error);
        return serverError(res,error);
    }
}

export const getProductByCat = async(req,res)=>{
    try {
        const productCat = req.query.category;
        const productCollection = await Products.find({category:productCat});
        if(!productCollection || productCollection.length === 0){
            return notFound(res,"No products found in this category");
        }
        return res.status(200).json(productCollection);
    } catch (error) {
        console.log("error in getProductByCat controller:",error);
        return serverError(res,error);
    }
}

export const updateProduct = async(req,res)=>{
    try {
        if(req.admin.role !== 'admin' && req.admin.role !== 'Boss'){
            return badRequest(res,"Only admin can update products");
        }
        const productId = req.params.id;
        const productUpdatedData = req.body;
        const product = await Products.findByIdAndUpdate(productId,productUpdatedData);
        if(!product){
            return notFound(res,"Product not found");
        }
        return res.status(200).json({message:"Product updated sucessfully"})
    } catch (error) {
        console.log("error in updateProduct controller:",error);
        return serverError(res,error);
    }
}

export const updateProductImages = async(req,res)=>{
    try{
        if(req.admin.role !== 'admin' && req.admin.role !== 'Boss'){
            return badRequest(res,"Only admin can update product images");
        }
        const productId = req.params.id;
        const product = await Products.findById(productId);
        if(!product){
            return notFound(res,"Product not found");
        }
        // add new images to existing images of the product
          if(!req.files || req.files.length === 0){
            return badRequest(res,"Please upload atleast one Image");
        }
        const images = [];
        for(let file of req.files){
            const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const uploadedPhotoUrl = await cloudinary.uploader.upload(base64Image);
            images.push({
                url:uploadedPhotoUrl.secure_url,
                public_Id:uploadedPhotoUrl.public_id
            })
        }
        product.photo.push(...images);
        await product.save();
        return res.status(200).json({message:"Product images updated successfully",product});
    }catch(error){
        console.log("error in updateProductImages controller:",error);
        return serverError(res,error);
    }
}

export const deleteProductImage = async(req,res)=>{
    try{
        if(req.admin.role !== 'admin' && req.admin.role !== 'Boss'){
            return badRequest(res,"Only admin can delete product images");
        }
        const productId = req.params.id;
        const {public_Id} = req.body;
        const product = await Products.findById(productId);
        if(!product){
            return notFound(res,"Product not found");
        }
        const imageIndex = product.photo.findIndex((img)=>img.public_Id === public_Id);
        if(imageIndex === -1){
            return notFound(res,"Image not found");
        }
        await cloudinary.uploader.destroy(public_Id);
        product.photo.splice(imageIndex,1);
        await product.save();
        return res.status(200).json({message:"Product image deleted successfully",product});
    }catch(error){
        console.log("error in deleteProductImage controller:",error);
        return serverError(res,error);
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        if(req.admin.role !== 'admin' && req.admin.role !== 'Boss'){
            return badRequest(res,"Only admin can delete products");
        }
        const productId = req.params.id;
        const product = await Products.findByIdAndDelete(productId);
        if(!product){
            return notFound(res,"Product not found");
        }
        return res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        console.log("error in deleteProduct controller:",error);
        return serverError(res,error)
    }
}
