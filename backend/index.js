import express from 'express'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utlis/db.js'
import userRoutes from  './routes/user.route.js'
import companyRoutes from './routes/company.route.js'


dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/api/v1/user',userRoutes)
app.use('/api/v1/company',companyRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> {
    connectDB()
    console.log("Server running on ",PORT)
})