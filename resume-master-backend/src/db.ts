import mongoose from "mongoose";

const connectDb = async (url: string) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch (error: any) {
        console.log("Mongo Connection Error: " + error);
        process.exit(1);
    }
}

export default connectDb; 