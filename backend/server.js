
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    debug: true,
});


app.use(
    cors({
      origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:5173",
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add necessary methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    })
  );
  
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname,'tmp'),
    limits: { fileSize: 100 * 1024 * 1024 },
    createParentPath: true,
}));

app.use(express.static(path.join(__dirname,'frontend/dist')));

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/user',userRoutes);



setTimeout(async () => {
    try {
        await fs.promises.unlink(path.join(__dirname, "temp", "file.txt"));
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error(error);
        }
    }
}, 5000);

app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})


