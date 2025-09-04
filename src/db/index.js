import mongoose from "mongoose"; // Import the mongoose library to interact with MongoDB
import { DB_NAME } from "../constants.js"; // Import the database name constant from the constants file


// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Try to connect to MongoDB using the URI from environment variables and the database name
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // If successful, log the host of the connected database
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        // If there is an error during connection, log the error message
        console.log("MongoDB connection error ", error);
        // Exit the process with a failure code
        process.exit(1);
    }
}

// Export the connectDB function so it can be used in other files
export default connectDB