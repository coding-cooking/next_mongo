import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO as string);
        console.log("mongoose connected");

    } catch (error: any) {
        throw new error("Connection failed!")
    }
}

export default connectDb;