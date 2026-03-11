import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://attendance-app-seven-azure.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send("Backend Running...")
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});