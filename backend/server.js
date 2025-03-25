import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000



// middleware
app.use(cors())
app.use(express.json())

// api endpoint
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/images",express.static('uploads'))



//db connec
connectDB()




app.get("/",(req,res)=>{
    res.send("API WORKING!!!")
})

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})

