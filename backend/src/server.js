import express from 'express'
import 'dotenv/config'
import path from 'path'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import {connectDB} from './lib/db.js'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve();

app.use(express.json()) //Else req.body will be undefined
app.use(cookieParser()) //Else we cant use req.cookies for middleware

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