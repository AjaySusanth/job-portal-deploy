import express from 'express'
import { login, logout, register, updateProfile } from '../controller/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js';

const router  = express.Router()

router.post('/register',register);
router.post("/login",login);
router.get('/logout',logout)
router.post("/profile/update",isAuthenticated,updateProfile);

export default router