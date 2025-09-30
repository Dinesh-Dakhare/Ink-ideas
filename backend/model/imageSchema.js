import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }, // path to uploaded file
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who uploaded
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // optional link to post
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
