import imageSchema from "../model/imageSchema.js";
export const uploadImg = async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
console.log(req.file);
console.log(req.user);

  const url = `${process.env.BASE_URL}/backend/uploads/${req.file.filename}`;

  // Save in DB
  const newImage = await imageSchema.create({
    url: url,
    uploadedBy: req.user._id,
    post: req.body.postId || null, // link to a post if passed
  });

  res.status(201).json(newImage.url);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}