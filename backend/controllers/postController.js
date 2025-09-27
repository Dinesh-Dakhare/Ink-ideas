import slugify from "slugify";
import postSchema from "../model/postSchema.js";
export const getPosts = async(req, res) => {
  try {
    const { category, search, page = 1, limit = 6 } = req.query;
console.log(category,search,page,limit);

    // const query = {};
    // if (category) query.category = category;
    // if (search) query.title = { $regex: search, $options: "i" };

    // const posts = await postSchema.find(query)
    //   .populate("author", "username avatar")
    //   .populate("category", "name")
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(parseInt(limit));

    // const total = await postSchema.countDocuments(query);

    // res.json({
    //   posts,
    //   currentPage: parseInt(page),
    //   totalPages: Math.ceil(total / limit),
    //   totalPosts: total,
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPostBySlug = async(req, res) => {
    try {
    const post = await postSchema.findOne({ slug: req.params.slug })
      .populate("author", "username avatar")
      .populate("category", "name");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createPost = async(req, res) => {
    try {
    const { title, contentJSON, contentHTML, category, tags, coverImage } = req.body;

    const post = await postSchema.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      content: contentJSON,
      contentHTML,
      category,
      author: req.user._id,
      tags,
      coverImage,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updatePost = (req, res) => {
    res.send("Update post");
}

export const deletePost = (req, res) => {
    res.send("Delete post");
}

export const toggleLikePost = (req, res) => {
    res.send("Get post");
}

export const incrementViews = (req, res) => {
    res.send("Get post");
}