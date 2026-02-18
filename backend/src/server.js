import express from 'express'
import 'dotenv/config'
import path from 'path'

import authRoutes from './routes/auth.route.js'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve();

app.use('/api/auth',authRoutes)

//make ready for deployment
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.use((_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:3000/`)
})