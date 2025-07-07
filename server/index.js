import express from 'express';
import 'dotenv/config';
import cors from "cors";
import authRouter from "./src/routes/auth.js";
import problemRouter from './src/routes/problem.js';
import userRouter from './src/routes/user.js';
import adminUserRoutes from './src/routes/admin.js';
import db_connection from './src/database/db_connection.js';

const app = express();
const port = process.env.PORT;

//Frontend is connected to Backend
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  }));
  
app.use(express.json());

app.get("/",(req, res)=>{
    res.send("Home page !!!!!");
})

db_connection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1", adminUserRoutes);

app.listen(port, ()=>{
    console.log(`project is running on http://localhost:${port}`);
})