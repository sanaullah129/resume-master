import mongoose from "mongoose";

const connectDb = async (MONGO_URL: string): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Mongo Db Connection Error - ", error);
        process.exit(1);
    }
};

export default connectDb;