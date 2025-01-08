import express from 'express'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utlis/db.js'
import userRoutes from  './routes/user.route.js'
import companyRoutes from './routes/company.route.js'
import jobRoutes from './routes/job.route.js'
import applicationRoutes from './routes/application.route.js'
import path from 'path'

dotenv.config()

const app = express()

const _dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin:'http://localhost:5000',
    credentials:true
}
app.use(cors(corsOptions));



app.use('/api/v1/user',userRoutes)
app.use('/api/v1/company',companyRoutes)
app.use('/api/v1/job',jobRoutes)
app.use('/api/v1/application',applicationRoutes)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> {
    connectDB()
    console.log("Server running on ",PORT)
})