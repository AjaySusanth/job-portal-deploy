import { Company } from "../models/company.model.js";
import getDataUri from "../utlis/getDataUri.js"
import cloudinary from "../utlis/cloudinary.js"

export const registerCompany = async(req,res) => {
    const {name} = req.body;
    console.log(name)
    if(!name) {
        return res.status(400).json({
            message:"Company name is required",
            success:false
        })
    }
    const userId = req.id;
    try{
        const existingCompany = await Company.findOne({name});
        if(existingCompany) {
            return res.status(400).json({
                message:"Company already registered",
                success:false
            })
        }

        const company = await Company.create({
            name,
            userId
        })

        res.status(201).json({
            message:"Company registered successfully",
            success:true,
            company
        })
    } catch(error) {
        console.error("Error in register company: ",error.message);
        res.status(500).json({
            message:"Unexpected error in registering company",
            success:false
        })
    }
}

export const updateCompany = async(req,res) => {
    const {name,description,location,website} = req.body;
    const file = req.file
    try {
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url
        const updateData = {name,description,location,website,logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})

        if(!company) {
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        res.status(200).json({
            message:"Company details updated sucessfully",
            success:true,
            company
        })
    } catch(error) {
        console.error("Error in updating company: ",error.message);
        res.status(500).json({
            message:"Unexpected error in updating company",
            success:false
        })
    }
}

export const getCompany = async(req,res) =>{
    const userId = req.id
    try{
        const companies = await Company.find({userId});
        if(!companies) {
            return res.status(404).json({
                message:"No companies registered by the user",
                succes:false
            })
        }

        res.status(200).json({
            message:"Companies retrieved successfully",
            succes:true,
            companies
        })
    } catch(error) {
        console.error("Error in get company: ",error.message);
        res.status(500).json({
            message:"Unexpected error in getting company list",
            success:false
        })
    }
}

export const getCompanyById = async(req,res) => {
    const id = req.params.id
    try{
        const company = await Company.findById(id)
        if(!company) {
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        res.status(200).json({
            message:"Company retrieved successfully",
            success:true,
            company
        })
    } catch(error) {
        console.error("Error in get company by id: ",error.message);
        res.status(500).json({
            message:"Unexpected error in getting company by id",
            success:false
        })
    }
}