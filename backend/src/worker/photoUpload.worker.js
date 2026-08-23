import {Worker} from 'bullmq';

const worker = new Worker('productPhotoUpload', async (job)=>{
    try {
        
    } catch (error) {
        
    }
},{
    connection:redisConnection
})