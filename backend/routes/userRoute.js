import express from 'express'
import { userLogin, userRegister } from '../controllers/userController.js'


const user = express.Router()

user.post('/register',userRegister)
user.post('/login',userLogin)



export default user