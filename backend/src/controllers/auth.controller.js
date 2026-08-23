import Admin from '../models/admin.model.js';
import {generateToken} from '../lib/jwt.js';

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(401).json({message:'Invalid username or password'});
        }
        if(!admin.isActive){
            return res.status(403).json({message:'Admin is not active'});
        }
        if(!await admin.comparePassword(password)){
            return res.status(401).json({message:'Invalid username or password'});
        }
        const payload = {
            _id:admin._id,
            role:admin.role
        }
        const token = await generateToken(payload);
        res.cookie('paanToken',token,{
            maxAge: 2*24*60*60*1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax"
        })
        return res.status(200).json({message:"Login successful"});
    }catch(error){
        console.log("Error in login controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export const myProfile = async (req,res)=>{
    try{
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId).select('-password');
        if(!admin){
            return res.status(404).json({message:'Admin not found'});
        }
        return res.status(200).json({message:"Profile fetched successfully", admin});
    }catch(error){
        console.log("Error in myProfile controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export const logout = async (req,res)=>{
    try{
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(401).json({message:'Admin not found'});
        }
        res.clearCookie('paanToken',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
        return res.status(200).json({message:"Logout successful"});
    }catch(error){
        console.log("Error in logout controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}
