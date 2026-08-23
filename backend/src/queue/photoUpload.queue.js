import {Queue} from 'bullmq';
import { redisConnection } from '../middlewares/redis';

const queue = new Queue('productPhotoUpload',{
    connection:redisConnection
})