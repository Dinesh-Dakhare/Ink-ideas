import multer from "multer";
import path from "path";


// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/avatars/"); // folder where images are stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

export const upload = multer({ storage });