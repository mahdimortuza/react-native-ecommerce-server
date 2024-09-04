import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDb from "./config/db.js";
import testRoutes from "./routes/testRouter.js";


// server & port
dotenv.config()
connectDb( )
const port = process.env.PORT || 5000
const app = express()
 
// parsers
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// routes
app.use("/api/v1", testRoutes)

app.get("/", (req, res) => {
    return res.status(200).send("Hi man")
})

app.listen(port,() => {
    console.log(`server running on ${port}`)
})