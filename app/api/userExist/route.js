import connectDB from "@/libs/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req){
try {
const {email} = await req.json();
await connectDB();
const user = await UserModel.findOne({email}).select("_id")
return NextResponse.json({user},{status:200})

} catch (error) {
return NextResponse.json({message:"Server not work"},{status:200})   
}
}