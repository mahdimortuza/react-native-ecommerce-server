import userModel from "../models/userModel.js"

export const registerController = async( req, res) => {
    try {
        const {name, email, password, address, city, country, phone} = req.body

        if(!name || !email || !password || !address || !city || !country || !phone){
            return res.status(500).send({
                success:false,
                message: "Please provide all fields.", 
            })
        } 
        // check existing user
        const existingUser = await userModel.findOne({email})
        // validation
        if(existingUser){
            return res.status(500).send({
                success:false,
                message: "This email is already taken."

            })
        }
        const user = await userModel.create({name, email, password, address, city, country, phone})
        res.status(201).send({
            success: true,
            message:"Registration success. Please login!",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something wrong in register API",
            error
        })
    }
}

export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body

        // validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Please provide correct email and password "
            })
        }

        const user = await userModel.findOne({email})
        // user validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        // check password
        const isMatch = await user.comparePassword(password)
        // password validation
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Invalid credentials."
            })
        }
        res.status(200).send({
            success: true,
            message:"Login successfully! ",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in login API",
            error
        })
    }
}