import commentSchema from "../model/commentSchema.js";

// Create a comment or reply
export const createComment = async (req, res) => {
  try {
    const { postId, content, repliesId } = req.body;

    const comment = await commentSchema.create({
      post: postId,
      author: req.user.id,
      content,
      replies: repliesId || null, // if provided, it's a reply
    });

    const populated = await comment.populate("author", "username avatar");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a post (with replies)
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    console.log(req.query.page);

    const comments = await commentSchema
      .find({ post: postId, replies: null })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await commentSchema.countDocuments({
      post: postId,
      repliesId: null,
    });
    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await commentSchema
          .find({ replies: comment._id })
          .populate("author", "username avatar")
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json({
      comments: commentsWithReplies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
const userId = req.user.id;
    const comment = await commentSchema.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

      if (!comment.likes) comment.likes = []; // ✅ ensure array
   const isLiked = comment.likes.includes(userId);
    if (isLiked) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


