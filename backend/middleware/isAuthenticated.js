import express from 'express'
import jwt from 'jsonwebtoken'

const isAuthenticated = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        message:"User not authenticated, Please Login",
        success:false
    })

    try{     
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.id = decoded.userId;
        next()
    } catch(error) {
        console.error("Error in verifying token",error.message)
        return res.status(500).json({
            message: "Invalid or expired token, Please Login again",
            success:false
        })
    }

}
export default isAuthenticated;
