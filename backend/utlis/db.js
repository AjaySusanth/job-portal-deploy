import mongoose from "mongoose";

const connectDB = async()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to db")
    } catch(error) {
        console.log("Error in connecting to db",error.message)
    }
}

export default connectDB