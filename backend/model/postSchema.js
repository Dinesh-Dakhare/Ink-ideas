import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    // Store Tiptap JSON here
    content: { type: Object, required: true },
    // Optional: also store HTML if you need fast rendering
    contentHTML: { type: String },

    coverImage: { type: String, default: "" },
    category: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        type: String, // store either userId or IP (if not logged in)
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    readTime: { type: String, default: "5 min read" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
