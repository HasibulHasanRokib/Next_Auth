import connectDB from "@/libs/db";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

const salt = bcrypt.genSaltSync(10);

export async function POST(req){
    try {
        const {name,email,password} = await req.json();
        await connectDB();

        const newUser = await UserModel.create({name,email,password:bcrypt.hashSync(password,salt)})

        return NextResponse.json({message:"User register successful"},{status:201})

    } catch (error) {
        return NextResponse.json({message:"User registration failed!"},{status:201}) 
    }
}

