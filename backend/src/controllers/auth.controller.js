import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/utils.js'

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
        console.log('Error in signup controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async(req,res) => {
    res.send("login Controller")
}

export const logout = async(req,res) => {
    res.send("logout Controller")
}