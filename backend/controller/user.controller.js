import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res) =>{
    const {name,email,password,phoneNumber,role} = req.body

    if(!name|| !email || !password || !phoneNumber || !role) {
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })
    }

    try{
        let user = await User.findOne({email})

        if(user) {
            return res.status(400).json({
                message:"User already registerd, please login",
                success:false
            })
        }

        const hashedPassword =await bcrypt.hash(password,10)

        user = await User.create({
            name,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        })

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role
        }
        return res.status(201).json({
            message:"Accound registered successfully",
            success:true,
            user
        })

    } catch(error) {
        console.error("Error in register",error.message)
        return res.status(500).json({
            message:"Unexpected error in register",
            success:false
        })
    }
}

export const login = async(req,res) =>{
    const{email,password} = req.body
    
    if(!email || !password) {
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })
    }

    try {
        let user = await User.findOne({email})
    
        if(!user) {
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
    
        if(!isPasswordValid) {
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            })
        }

        const tokenData = {
            userId:user._id
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'5d'})

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role
        }

        return res.status(200)
        .cookie("token",token,{maxAge:5*24*60*60*100,httpOnly:true,sameSite:'strict'})
        .json({
            message:"User logged in succesfully",
            success:true,
            user
        })

    } catch(error) {
        console.error("Error in login",error.message)
        return res.status(500).json({
            message:"Unexpected error in login",
            success:false
        })
    }
}

export const logout = async(req,res) => {
    try{
        return res.status(200)
        .cookie("token","",{maxAge:0})
        .json({
            message:"Logged out successfully",
            success:true
        })
    } catch(error) {
        console.error("Error in logout",error.message)
        return res.status(500).json({
            message:"Unexpected error in logout",
            success:false
        })
    }
}

export const updateProfile = async(req,res) => {
    const {name,email,phoneNumber,bio,skills} = req.body

    try{

        const userId = req.id
        let user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }


        let skillsArray;
        if(skills) skillsArray = skills.split(",")

        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skillsArray) user.profile.skills = skillsArray

        await user.save()

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            bio:user.profile.bio,
            skills:user.profile.skills
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            success:true,
            user
        })

    } catch(error) {
        console.error("Error in updateProfile",error.message)
        return res.status(500).json({
            message:"Unexpected error in updateProfile",
            success:false
        })
    }
}