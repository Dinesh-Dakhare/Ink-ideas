import express from "express";
import { uploadImg } from "../controllers/uploadImgController.js";
import multer from "multer";
import { upload } from "../middleware/multer.js";
import {protect} from "../middleware/protect.js";
const img = express.Router();


img.post('/',upload.single('image') ,protect,uploadImg)


export default img