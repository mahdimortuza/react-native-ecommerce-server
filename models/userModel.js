import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, "This email already exists"],
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  profilePic:{
    type: String, 
  }
}, {timestamps:true});


// hashing password
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

// comparing password
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword, this.password)
}

userSchema.methods.generateToken = async function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
}

export const userModel = mongoose.model('User', userSchema);
 export  default userModel