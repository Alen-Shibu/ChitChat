import jwt from 'jsonwebtoken'

export const generateToken = (userId,res) => {
    try {
    //userId is taken as payload - unique identifier
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,

        //The other options are to enhance safety
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "development" ? false:true
    })

    return token
} catch (error) {
    console.log('Error in generateToken utils')
    return res.status(500).json({message:"Internal Server Error"})
}
}