import express from 'express'
import { createComment, getComments } from '../controllers/commentController.js'
import { protect } from '../middleware/protect.js'

const comment = express.Router()

comment.post('/',protect,createComment)
comment.get('/:postId',protect,getComments)



export default comment