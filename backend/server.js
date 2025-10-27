import express from 'express';
import cors from 'cors';
import  'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

//connect db
connectDB();

//middleware
app.use(express.json())

app.use("/api/auth",userRouter)
app.use("/api/resume",resumeRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//routes
app.get('/', (req, res) => {
  res.send('API is running....')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});