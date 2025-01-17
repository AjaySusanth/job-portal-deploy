import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utlis/getDataUri.js"
import cloudinary from "../utlis/cloudinary.js"

export const register = async(req,res) =>{
    const {name,email,password,phoneNumber,role} = req.body
    const file = req.file

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

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        user = await User.create({
            name,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
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
    const{email,password,role} = req.body
    
    if(!email || !password || !role) {
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

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

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

        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'5d'})

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile: user.profile
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
    const file = req.file
    try{

        const userId = req.id
        let user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


        let skillsArray;
        if(skills) skillsArray = skills.split(",")

        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skillsArray) user.profile.skills = skillsArray
        if(cloudResponse) {
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save()

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
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
