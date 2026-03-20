import {Server} from "socket.io"
import express from "express"
import http from "http"
import "dotenv/config"
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js"

const app = express()
const server = http.createServer(app)
const CLIENT_URL = process.env.CLIENT_URL

const io = new Server(server,{
    cors:{
        origin: [CLIENT_URL],
        credentials:true
    }
})

io.use(socketAuthMiddleware)

const userSocketMap = {}

io.on("connection",(socket) => {
    console.log("A user connected",socket.user.fullName)

    const userId = socket.userId;
    userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log('A user disconnected',socket.user.fullName)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {io,app,server}