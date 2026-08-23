import mongoose from "mongoose";
import { config } from "dotenv";
config();
const MongoDBUrl = process.env.MONGODBURL;

mongoose.connect(MongoDBUrl);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("database connected successfully");
})

db.on('disconnected',()=>{
    console.log("database disconnected successfully");
})

db.on('error',(err)=>{
    console.log("error in database connection",err);
})

export default db;