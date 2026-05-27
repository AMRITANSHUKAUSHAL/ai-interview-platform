import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

export const register = async(req,res)=>{
    try{

        const {name,email,password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where:{email},
        });
        if(existingUser){
            return res.json({
                message:"User Already Exists",
            })
        }


        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
            },
        });
        res.json({
            message:"User Registered",
            user,
        });

    }catch(error){

        res.status(500).json(error)

    }
}


export const login = async(req,res)=>{
    try{

        const {email,password} = req.body;
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        });
        if(!user){
            return res.status(400).json({
                message:"User Not Found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Credentials",
            });
        }

        const token = jwt.sign(
            {
                id:user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );

        res.json({
            message:"Login Successfully",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },
        });

    }catch(error){
        res.status(500).json(error);
    }
}