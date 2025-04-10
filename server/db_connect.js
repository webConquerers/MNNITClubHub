import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/MNNITHub");
        console.log("MongoDb server connected");
    } catch (error) {
        console.log(error);
    }
};
export default connectDB 