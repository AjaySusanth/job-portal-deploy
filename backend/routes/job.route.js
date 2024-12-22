import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { createJob, getAdminJobs, getAllJobs, getJobById } from '../controller/job.controller.js'

const router = express.Router()

router.post('/create',isAuthenticated,createJob);
router.get('/get',isAuthenticated,getAllJobs);
router.get('/get/:id',isAuthenticated,getJobById);
router.get('/adminJobs',isAuthenticated,getAdminJobs);

export default router
