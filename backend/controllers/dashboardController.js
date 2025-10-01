import postSchema from "../model/postSchema.js";
import userSchema from "../model/userSchema.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // from protect middleware

    // 1. Total posts by user
    const totalPosts = await postSchema.countDocuments({ author: userId });

    // 2. Views (sum of all post views)
    const posts = await postSchema.find({ author: userId }).select("views category  title isPublished likes comments");
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

    // 3. Followers (if you track followers in User model)
    // const user = await userSchema.findById(userId).select("followers");
    // const followers = user?.followers?.length || 0;

    // 4. Engagement = (likes + comments) / views
    let engagement = 0;
    if (totalViews > 0) {
      const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
      const totalComments = posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
      engagement = ((totalLikes + totalComments) / totalViews) * 100;
    }

    // 5. Recent posts (last 5)
    const recentPosts = await postSchema.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title  views likes  updatedAt").populate("comments", "content");



    // 6. Top categories count
    const categories = {};
    posts.forEach((post) => {
      const cat = post.category || "Uncategorized";
      categories[cat] = (categories[cat] || 0) + 1;
    });

    res.json({
      totalPosts,
      totalViews,
    //   followers,
      engagement: engagement.toFixed(1),
      recentPosts,
      topCategories: categories,
     
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: err.message });
  }
};
