import express from 'express'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utlis/db.js'


dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors)


const PORT = 5000

app.listen(PORT,()=> {
    connectDB()
    console.log("Server running on ",PORT)
})