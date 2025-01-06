import { Company } from "../models/company.model.js"
import { Job } from "../models/job.model.js"

export const createJob = async(req,res) => {
    const {title,description,requirements,salary,experience,location,companyId,jobType,position} = req.body

    const userId = req.id

    if(!title || !description || !requirements || !salary || !experience || !location || !companyId || !jobType || !position) {
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })
    }

    try {
        const company = await Company.findById(companyId);
        if(!company) {
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            experienceLevel:Number(experience),
            location,
            company:companyId,
            jobType,
            position,
            created_by:userId
        })

        res.status(201).json({
            message:"Job created successfully",
            success:true,
            job
        })
    } catch(error) {
        console.error("Error in create job: ",error.message)
        res.status(500).json({
            message:"Unexpected error in creating job",
            success:false
        })
    }
}


export const getAllJobs = async(req,res) => {
    const keyword = req.query.keyword || ""

    try{
        const query = {
            $or: [
                {title:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"company",
            createdAt:-1
        });
        if(!jobs) {
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        res.status(200).json({
            message:"Jobs retrieved successfully",
            success:true,
            jobs
        })
    } catch(error) {
        console.error("Error in getting all jobs: ",error.message)
        res.status(500).json({
            message:"Unexpected error in getting all jobs",
            success:false
        })
    }
}

export const getJobById = async(req,res) => {
    const jobId = req.params.id;

    try{
        const job = await Job.findById(jobId).populate({
            path:'applications'
        });
        if(!job) {
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        res.status(200).json({
            message:"Job retrieved successfully",
            success:true,
            job
        })
    } catch(error) {
        console.error("Error in getting job: ",error.message)
        res.status(500).json({
            message:"Unexpected error in getting job",
            success:false
        })
    }
}

export const getAdminJobs = async(req,res) => {
    const adminId = req.id;

    try{
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            
        }).sort({createdAt:-1});
        if(!jobs) {
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        res.status(200).json({
            message:"Jobs retrieved successfully",
            success:true,
            jobs
        })

    } catch(error) {
        console.error("Error in getting admin jobs: ",error.message)
        res.status(500).json({
            message:"Unexpected error in getting admin jobs",
            success:false
        })
    }
}