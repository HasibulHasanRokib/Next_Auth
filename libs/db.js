import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB is connected.")
    } catch (error) {
        console.log("DB not connected!")
    }
}


export default connectDB;