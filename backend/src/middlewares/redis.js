import { createClient } from 'redis';
import { config } from 'dotenv';
config();

const redisPassword = process.env.REDIS_PASSWORD;

export const redisConnection = createClient({
    username: 'default',
    password: redisPassword,
    socket: {
        host: 'top-mesmeric-society-10854.db.redis.io',
        port: 14153
    }
});

redisConnection.on('error', err => console.log('Redis Client Error', err));

await redisConnection.connect();