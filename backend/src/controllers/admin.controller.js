import Admin from '../models/admin.model.js';
import cloudinary from '../lib/cloudinary.js';

//use only for one time to regsiter first Boss of Website
// export const superAdmin  = async (req,res)=>{
//     try{
//         console.log("body:",req.body);
//         const {name,email,password,role} = req.body;
        
//         let url = null;
        
//         if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
//             return res.status(400).json({message:'Invalid Email'});
//         }
//         if(req.file){
//             const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//             const uploadedPhotoUrl = await cloudinary.uploader.upload(base64Image);
//             url = uploadedPhotoUrl.secure_url;   
//         }
//         const newAdmin = new Admin({
//             name,
//             email,
//             password,
//             role,
//             photo: url
//         });
//         await newAdmin.save();
//         return res.status(201).json({message:'superAdmin added successfully'});
//     }catch(error){
//         console.log("Error in supperAdmin controller:", error);
//         return res.status(500).json({message:'Internal Server Error'});
//     }
// }

export const addAdmin = async (req,res)=>{
    try{
        if(req.admin.role !== 'Boss'){
            return res.status(403).json({message:'You are not authorized to add admins'});
        }
        const {name,email,password,role} = req.body;
        let url = null;
        
        if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            return res.status(400).json({message:'Invalid Email'});
        }
        if(req.file){
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const uploadedPhotoUrl = await cloudinary.uploader.upload(base64Image);
            url = uploadedPhotoUrl.secure_url;   
        }
        const newAdmin = new Admin({
            name,
            email,
            password,
            role,
            photo: url,
            createdBy: req.admin._id,
            updatedBy: req.admin._id
        });
        await newAdmin.save();
        return res.status(201).json({message:'Admin added successfully'});
    }catch(error){
        console.log("Error in addAdmin controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export const getAllAdmins = async (req,res)=>{
    try{
        if(req.admin.role !== 'Boss'){
            return res.status(403).json({message:'You are not authorized to view admins'});
        }
        const admins = await Admin.find().select('-password').sort({createdAt:-1});
        return res.status(200).json({data: admins});
    }catch(error){
        console.log("Error in getAllAdmins controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export const updateAdmin = async(req,res)=>{
    try{
        if(req.admin.role !== 'Boss'){
            return res.status(403).json({message:'You are not authorized to update admins'});
        }
        const {name,email,password,role,isActive} = req.body;
        const admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(404).json({message:'Admin not found'});
        }
        if(name) admin.name = name;
        if(email) admin.email = email;
        if(password) admin.password = password;
        if(role) admin.role = role;
        if(typeof isActive !== 'undefined') admin.isActive = isActive;
        admin.updatedBy = req.admin._id;
        await admin.save();
        return res.status(200).json({message:'Admin updated successfully'});
    }catch(error){
        console.log("Error in updateAdmin controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }

}

export const deleteAdmin = async(req,res)=>{
    try{
        if(req.admin.role !== 'Boss'){
            return res.status(403).json({message:'You are not authorized to delete admins'});
        };

        const admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(404).json({message:'Admin not found'});
        }
        admin.isActive = false;
        admin.updatedBy = req.admin._id;
        await admin.save();
        return res.status(200).json({message:'Admin deleted successfully'});
    }catch(error){
        console.log("Error in deleteAdmin controller:", error);
        return res.status(500).json({message:'Internal Server Error'});
    }

}
