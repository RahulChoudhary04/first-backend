import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // mere server se user ki cookies ko access and set karne ke liye

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // accepting json data from client of size 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" })) // accepting urlencoded data from client of size 16kb
app.use(express.static("public")) // for serving static files like images, pdf, etc.
app.use(cookieParser())


export { app }; 