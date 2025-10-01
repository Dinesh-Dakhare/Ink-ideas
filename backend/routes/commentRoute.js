import express from 'express'
import { createComment, getComments, likeComment, } from '../controllers/commentController.js'
import { protect } from '../middleware/protect.js'

const comment = express.Router()

comment.post('/',protect,createComment)
comment.get('/:postId',protect,getComments)

//like comment
comment.post('/like/:id',protect,likeComment)



export default comment