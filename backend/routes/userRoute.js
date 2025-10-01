import express from 'express'
import { updateProfile, uploadImg, userLogin, userRegister } from '../controllers/userController.js'
import {upload} from '../middleware/profileMulter.js'
import { protect } from '../middleware/protect.js'

const user = express.Router()

user.post('/register',userRegister)
user.post('/login',userLogin)
user.post('/upload-avatar',upload.single('avatar'),protect,uploadImg)
user.put('/update-profile',protect,updateProfile)

export default user