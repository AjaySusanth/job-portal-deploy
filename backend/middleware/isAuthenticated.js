import express from 'express'
import jwt from 'jsonwebtoken'

const isAuthenticated = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        message:"User not authenticated",
        success:false
    })

    try{     
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({
            message:"Invalid token",
            success:false
        })
        req.id = decoded.userId;
        next()
    } catch(error) {
        console.error("Error in verifying token",error.message)
        return res.status(500).json({
            message:"Unexpected error in verfying token",
            success:false
        })
    }

}
export default isAuthenticated;