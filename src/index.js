// Import the dotenv package to load environment variables from a .env file
import dotenv from "dotenv"

// Import the connectDB function from the local db/index.js file to handle database connection
import connectDB from "./db/index.js";

import {app} from "./app.js"

// Load environment variables from the './env' file into process.env
dotenv.config({
    path: './env'
})

// Call the connectDB function to connect to the database
connectDB()
.then(() => {
    // If the database connection is successful, start the server
    app.listen(process.env.PORT || 8000, () => {
        // Log a message indicating the server is running and on which port
        console.log(`Server is running at port : ${process.env.PORT}`);
    }) 
})
.catch((err) => {
    // If the database connection fails, log the error message
    console.log("MongoDB connection failed: ", err );
})

/*
import express from "express"           // Import the express framework
const app = express()                   // Create an instance of an Express application

( async () => {                         // Define and immediately invoke an async function
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // Connect to MongoDB using environment variables
        app.on("error", (error) => {    // Listen for errors on the app
            console.log("Error: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => { // Start the server on the specified port
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {                   // Catch any errors during connection or server start
        console.error("Error connecting to MongoDB:", error);
        throw err
    }
})()
*/