import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"
export const isAuth = async( req, res, next) => {
    const {token} = req.cookies

    // validation
    if(!token) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized user."
        })
    }
    const decodedData = JWT.verify(token, process.env.JWT_SECRET)
    req.user = await userModel.findById(decodedData._id)
    next()
}