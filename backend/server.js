import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './db/db.js'
import blog from './routes/postRoute.js'
import user from './routes/userRoute.js'
import path from "path";
import img from './routes/uploadImg.js'
import comment from './routes/commentRoute.js'
import dashboard from './routes/dashboardRoute.js'

const app = express()
dotenv.config()

app.use(cors( {
  origin: 'http://localhost:5173',
  credentials:true,
}))

app.use("/uploads", express.static(path.join(process.cwd(), "backend/uploads"))); 

connectDb()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/blogs',blog)
app.use('/api/v1/auth',user)
app.use('/api/v1/upload',img)
app.use('/api/v1/comment',comment)
app.use('/api/v1/dashboard',dashboard)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
