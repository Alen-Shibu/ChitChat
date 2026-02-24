import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloudinary.js'

export const getAllContacts = async(req,res) => {
    try {
        const loggedinUserId = req.user._id;

        //Finding all users who isn't the loggedIn user
        const filteredUsers = await User.find({_id:{$ne:loggedinUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('Error in getAllContacts controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getMessagesByUserId = async(req,res) => {
    try {
        const loggedinUserId = req.user._id;
        const otherPersonId = req.params.id;

        //To get the messages between users,we have to take the messages where sender is one and receiver is other
        const messages = await Message.find({
            $or: [
                {senderId:loggedinUserId,receiverId:otherPersonId},
                {senderId:otherPersonId,receiverId:loggedinUserId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in getMessagesByUserId controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})     
    }
}

export const sendMessage = async(req,res) => {
    try {
        const {text,image} = req.body;
        const senderId = req.user.id
        const receiverId = req.params.id
        if(!text || !image) return res.status(400).json({message:"Text or Image is required"})

        //Incase of an image,uploading it to cloudinary to send it
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error in sendMessage controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getAllChats = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;

        //To only take chats with messages, either the user should send or recieive a message
        const messages = await Message.find({
            $or:[
                {senderId:loggedInUserId},{receiverId:loggedInUserId}
            ]
        })

        //We use spread operator [... ] to turn the set back ibnto array so we could use mongoose functions on it
        //We use Set to remove duplicates
        //mapping each message and checking if we are the sender to get the other person's id 
        const chatPartnerId = [...new Set(messages.map((msg) => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))]

        //Get all users with Id's which are in the array chatPartnerId
        const chatPartners = await User.find({_id:{$in:chatPartnerId}}).select("-password")

        res.status(200).json(chatPartners)
    } catch (error) {
        console.log('Error in getAllChats controller:',error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}