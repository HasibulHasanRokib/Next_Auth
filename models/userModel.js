import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
},{timestamps:true})

const UserModel = mongoose.models.Users || mongoose.model("Users",userSchema)

export default UserModel;