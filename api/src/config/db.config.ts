import mongoose from "mongoose";
import { DB_URL } from "./var.config";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_URL);
        console.log('connection with database is successful');
    } catch (e) {
        console.error(`Error: ${e as Error}.message`);
        process.exit(1);
    }
}

export default connectDB
