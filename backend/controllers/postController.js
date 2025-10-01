import slugify from "slugify";
import postSchema from "../model/postSchema.js";
import ImageSchema from "../model/imageSchema.js";
export const getPosts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 6 } = req.query;
    console.log(category, search, page, limit);

    const query = {};
    if (category) query.category =  { $regex: new RegExp(`^${category}$`, "i")  };;
    if (search) query.title = { $regex: search, $options: "i" };

console.log(query);

    const posts = await postSchema
      .find(query)
      .populate("author", "username avatar")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await postSchema.countDocuments(query);
console.log(posts);

    res.status(200).json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await postSchema
      .findOne({ slug: req.params.slug })
      .populate("author", "username avatar")
      .populate("category", "name");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, contentJSON, contentHTML, category, tags, coverImage } =
      req.body;



    const post = await postSchema.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      content: contentJSON,
      contentHTML,
      category,
      author: req.user.id,
      tags,
      coverImage,
    });
 
    const imageUrls = extractImageUrls(contentJSON);

    // 3. Update only those images (with post=null before)
    await ImageSchema.updateMany(
      {
        uploadedBy: req.user._id,
        post: null,                  // only unlinked images
        url: { $in: imageUrls },     // only ones in this content
      },
      { post: post._id }             // update with this postId
    );

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = (req, res) => {
  res.send("Update post");
};

export const deletePost = (req, res) => {
  res.send("Delete post");
};

export const toggleLikePost = (req, res) => {
  res.send("Get post");
};

export const incrementViews = (req, res) => {
  res.send("Get post");
};


export const postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
console.log(id);

    const post = await postSchema.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

      if (!post.likes) post.likes = []; // ✅ ensure array

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, isLiked: !isLiked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};