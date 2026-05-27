import express from "express";
import cors  from "cors";
import dotenv from "dotenv";
import authRoutes from "../server/routes/authRoutes.js";
import interviewRoutes from "../server/routes/interviewRoutes.js";
import historyRoutes from "../server/routes/historyRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/interview",interviewRoutes);
app.use("/api",historyRoutes);
app.get("/api/protected",authMiddleware,(req,res)=>{
    res.json({
        message:"Protected Route Accessed",
        user:req.user,
    })
})

app.get("/",(req,res)=>{
    res.send("API Running");
})




const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})