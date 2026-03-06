import express from 'express'
import 'dotenv/config'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import {connectDB} from './lib/db.js'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true })); //Else req.body will be undefined
app.use(cookieParser()) //Else we cant use req.cookies for middleware
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

//make ready for deployment
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.use((_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    connectDB()
    console.log(`App is running on http://localhost:3000/`)
})