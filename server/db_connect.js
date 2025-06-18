/* eslint-disable no-undef */
import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDb server connected");
    } catch (error) {
        console.log(error);
    }
};
export default connectDB 