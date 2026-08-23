import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import './middlewares/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import productRoutes from './routes/product.route.js';
import reviewRoutes from './routes/review.route.js';    
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
config();


const app = express();
const Port = process.env.PORT;

app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/bpb/auth',authRoutes);
app.use('/bpb/admin',adminRoutes);
app.use('/bpb/product',productRoutes);
app.use('/bpb/review',reviewRoutes);

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})
