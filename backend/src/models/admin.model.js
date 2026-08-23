import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    role:{
        type:String,
        required:true,
        default:'admin'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    photo:{
        type:String
    },
    createdBy:{
        type:String,
    },
    updatedBy:{
        type:String,
    }
},{timestamps:true  
})


adminSchema.pre('save',async function(next){
   try {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password,salt);
    this.password = hashPassword;
   } catch (error) {
    throw error;
   }
})

adminSchema.methods.comparePassword = async function(password){
    try {
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const adminCollection = mongoose.model('adminCollection',adminSchema);
export default adminCollection;