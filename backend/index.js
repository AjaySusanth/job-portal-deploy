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

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin:'https://job-portal-live.vercel.app',
    credentials:true
}
app.use(cors(corsOptions));



app.use('/api/v1/user',userRoutes)
app.use('/api/v1/company',companyRoutes)
app.use('/api/v1/job',jobRoutes)
app.use('/api/v1/application',applicationRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> {
    connectDB()
    console.log("Server running on ",PORT)
})
