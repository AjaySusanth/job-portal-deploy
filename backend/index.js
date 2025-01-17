import express from 'express'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utlis/db.js'
import userRoutes from  './routes/user.route.js'
import companyRoutes from './routes/company.route.js'
import jobRoutes from './routes/job.route.js'
import applicationRoutes from './routes/application.route.js'

dotenv.config()

const app = express()

const corsOptions = {
    origin: 'https://job-portal-live.onrender.com', // Use the exact origin of your frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))




app.use('/api/v1/user',userRoutes)
app.use('/api/v1/company',companyRoutes)
app.use('/api/v1/job',jobRoutes)
app.use('/api/v1/application',applicationRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> {
    connectDB()
    console.log("Server running on ",PORT)
})
