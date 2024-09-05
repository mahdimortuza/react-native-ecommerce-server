import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDb from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import testRoutes from "./routes/testRouter.js";
import userRoute from "./routes/userRoute.js";


// server & port
dotenv.config()
connectDb( )
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const port = process.env.PORT || 5000
const app = express()

 
// parsers
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// routes
app.use("/api/v1", testRoutes)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)

app.get("/", (req, res) => {
    return res.status(200).send("Hi man")
})

app.listen(port,() => {
    console.log(`server running on ${port} on ${process.env.NODE_ENV} mode`)
})