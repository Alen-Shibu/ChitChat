import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

export const signup = async(req,res) => {
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters long"})
        }

        //Check if email is in valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "user already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            await newUser.save()
            generateToken(newUser._id,res)
            res.status(201).json({
                id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        } else{
            res.status(400).json({message:"Invalid User data"})
        }


    } catch (error) {
        console.error('Error in signup controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password) return res.status(400).json({message:"Email & Password are required"})
            
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message:"Invalid Credentials"})
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid Credentials"})

        generateToken(user._id,res)
        res.status(200).json({
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.error('Error in login controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = async(_,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message:"Logged out succesfully"})
    } catch (error) {
        console.error('Error in logout controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProfile = async(req,res)=>{
    const {profilePic} = req.body;
    try {
        if(!profilePic) return res.status(400).json({message:"Image is required"})

        // Upload into cloudinary
        const cloudUpload = await cloudinary.uploader.upload(profilePic)

        // Change in Database
        const userId = req.user._id
        const updatedProfile = await User.findByIdAndUpdate(userId,{profilePic:cloudUpload.secure_url},{new:true}).select("-password")

        res.status(200).json(updatedProfile)

    } catch (error) {
        console.error('Error in updateProfile controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})    
    }
}