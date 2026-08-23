import jwtToken from 'jsonwebtoken';
import {config} from 'dotenv';
config();

const secretKey = process.env.SECRET_KEY;

export const generateToken = (payload)=>{
    try{
        const token  = jwtToken.sign(payload,secretKey);
        return token;
    }catch(error){
        console.log("Error in generateToken function:", error);
        throw error;
    }
}
