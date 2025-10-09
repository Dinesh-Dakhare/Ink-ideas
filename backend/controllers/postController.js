import slugify from "slugify";
import postSchema from "../model/postSchema.js";
import ImageSchema from "../model/imageSchema.js";
import { extractImageUrls } from "../middleware/extractImageUrls.js";
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

export const deletePost = async(req, res) => {
const { id } = req.params;

const post = await postSchema.findById(id);
if(!post) return res.status(404).json({ message: "Post not found" });

try {
  await postSchema.findByIdAndDelete(id);
  res.status(200).json({ message: "Post deleted successfully" });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const toggleLikePost = (req, res) => {
  res.send("Get post");
};

export const incrementViews = async (req, res) => {
try {

  console.log();
  
    const postId = req.params.id;
    const userId = req.user?.id?.toString(); // if logged in
    const userIp = req.ip; // fallback if not logged in

    const viewerId = userId || userIp;

    const post = await postSchema.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Prevent duplicate views from the same user/IP
    if (!post.viewedBy.includes(viewerId)) {
      post.views += 1;
      post.viewedBy.push(viewerId);
      await post.save();
    }

    res.status(200).json({ views: post.views });
  } catch (error) {
    console.error("Error updating views:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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