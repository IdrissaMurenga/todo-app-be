import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from './routes/todoRoutes.js'

// connect to link variables
dotenv.config();

// connect to express server
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/todos', todoRoutes);

const MONGODB = process.env.MONGO_URI
mongoose.connect(MONGODB)
    .then(() => {
        const port = process.env.PORT
        app.listen(port, () => console.log(`Server running on port ${port}.....`));
    })
    .catch((err) => console.log(err.message))