import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req,res) => {
    const jobId = req.params.id;
    const userId = req.id;
    if(!jobId) {
        return res.status(400).json({
            message:"Job id is required",
            success:false
        })
    }

    try {
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(404).json({
              message:"Job not found",
              success:false  
            })
        }

        const existingApplication  = await Application.findOne({job:jobId,applicant:userId})

        if(existingApplication) {
            return res.status(400).json({
                message:"Already applied to this job",
                success:false
            })
        }

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        res.status(201).json({
            message:"Job applied successfully",
            success:true
        })

    } catch(error) {
        console.error("Error in applyJob",error.message);
        res.status(500).json({
            message:"Unexpected error in applying job",
            success:false
        })
    }
}

export const getAppliedJobs = async(req,res) => {
    const userId =req.id;

    try {
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        })

        if(!applications) {
            return res.status(404).json({
                message:"No applications found",
                success:false
            })
        }

        res.status(200).json({
            success:true,
            applications
        })

    } catch (error) {
        console.error("Error in getAppliedJobs",error.message);
        res.status(500).json({
            message:"Unexpected error in getting applied jobs",
            success:false
        })
    }
}

export const getApplicants = async(req,res) =>{
    const jobId = req.params.id;

    try {
        const applicants = await Job.findById(jobId).sort({createdAt:-1}).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })

        if(!applicants) {
            return res.status(404).json({
                message:"No applicants were found",
                success:false
            })
        }

        res.status(200).json({
            success:true,
            applicants
        })
    } catch (error) {
        console.error("Error in getApplicants",error.message);
        res.status(500).json({
            message:"Unexpected error in getting applicants",
            success:false
        })
    }
}

export const updateStatus = async(req,res) => {
    const applicationId = req.params.id;
    const {status} = req.body;
    try {
        const application = await Application.findById(applicationId);
        if(!application) {
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        res.status(201).json({
            message:"Status updated successfully",
            success:true
        })

    } catch (error) {
        console.error("Error in updateStatus",error.message);
        res.status(500).json({
            message:"Unexpected error in updating application status",
            success:false
        })
    }
}