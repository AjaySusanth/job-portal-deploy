import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controller/application.controller.js';

const router = express.Router()

router.get('/:id/apply',isAuthenticated,applyJob);
router.get('/get',isAuthenticated,getAppliedJobs);
router.get('/:id/applicants',isAuthenticated,getApplicants);
router.post('/status/:id/update',isAuthenticated,updateStatus);

export default router
