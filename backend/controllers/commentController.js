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

    const comments = await commentSchema
      .find({ post: postId, parent: null })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await commentSchema
          .find({ repliesId: comment._id })
          .populate("author", "username avatar")
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json(commentsWithReplies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
