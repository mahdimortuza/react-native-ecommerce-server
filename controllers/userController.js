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

        // token 
         const token = await user.generateToken()
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "development" ? true : false, 
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false
        }).send({
            success: true, 
            message:"Login successfully! ",
            token,
            user,
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

// user profile
export const getUserProfileController = async(req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        user.password= undefined
        res.status(200).send({
            success: true, 
            message:"Profile fetched successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in profile API",
            error
        })
    }
}

export const logoutController = async(req, res) => {
        try {
            res.status(200).cookie("token", "", {
                expires: new Date(Date.now()),
                secure: process.env.NODE_ENV === "development" ? true : false, 
                httpOnly: process.env.NODE_ENV === "development" ? true : false,
                sameSite: process.env.NODE_ENV === "development" ? true : false
            }).send({
                success: true,
                message: "Logout successfully"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message:"Error in logout API",
                error
            })
        }
}

export const updateProfileController = async( req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        const {name, email, address, city, country, phone } = req.body

        if(name) user.name = name
        if(email) user.email = email
        if(address) user.address = address
        if(city) user.city = city
        if(country) user.country = country
        if(phone) user.phone = phone

        await user.save()
        res.status(200).send({
            success: true,
            message: "User profile updated "
        })
    } catch (error) {
        console.log(error)
            res.status(500).send({
                success: false,
                message:"Error in update profile API",
                error
            })
    }
}


// update password
export const updatePasswordController = async(req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        const {oldPassword, newPassword} = req.body
        // validation
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message: "Please provide old or new password."
            })
        }

        const isMatch = await user.comparePassword(oldPassword)

        // validation 
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message:"Invalid old password. "
            })
        }
        user.password = newPassword
        await user.save()
        res.status(200).send({
            success: true,
            message:"Password updated successfully. "
        })
    } catch (error) {
        console.log(error)
            res.status(500).send({
                success: false,
                message:"Error in update password API",
                error
            })
    }
}