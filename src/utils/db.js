import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("mongoose connected");

    } catch (error) {
        throw new error("Connection failed!")
    }
}

export default connectDb;