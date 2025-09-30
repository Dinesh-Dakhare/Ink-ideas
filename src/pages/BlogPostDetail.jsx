import React, { use, useEffect, useState } from "react";
import {
  Share,
  MessageCircle,
  Heart,
  Bookmark,
  Twitter,
  Linkedin,
  Facebook,
  Clock,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react";
import RelatedPosts from "../component/RelatedPosts";
import CommentAndReplies from "../component/CommentAndReplies";
import AuthorCard from "../component/AuthorCard";
import { NavLink, useLocation, useParams } from "react-router-dom";
import api from "../services/api.js";

const BlogPostDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState(""); // ✅ separate state
  const [replyingTo, setReplyingTo] = useState(null);
  const [comments, setComments] = useState([]);

  const [replyText, setReplyText] = useState("");

  // Mock data

  const relatedPosts = [
    {
      id: 1,
      title: "Advanced React Hooks: useCallback and useMemo",
      category: "React",
      readingTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
      author: "Mike Johnson",
    },
    {
      id: 2,
      title: "TypeScript Best Practices for React Developers",
      category: "TypeScript",
      readingTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      author: "Emily Davis",
    },
    {
      id: 3,
      title: "Testing React Components with Jest and Testing Library",
      category: "Testing",
      readingTime: "15 min read",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      author: "David Wilson",
    },
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const handleCommentSubmit = async (comment) => {
    // if (!newComment.trim()) return;

    try {
      const res = await api.post("/api/v1/comment", {
        postId: post._id,
        content: comment,
        repliesId: null,
      });
      if (res.status === 201) {
        console.log(res.data);
        setComments(res.data); // ✅ just add new comment
        setNewComment("");
        setReplyingTo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
 const loadComments = async () => {
      try {
        const res = await api.get(`/api/v1/comment/${post._id}`);
        setComments(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    loadComments();
  },[post])

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="flex items-center gap-2 my-5 ">
          <NavLink className=" bg-blue-300 p-2 rounded-full  hover:cursor-pointer ">
            <ArrowLeft className="hover:cursor-pointer  " />
          </NavLink>
          <p className="text-xl font-medium">Back</p>
        </div>
        {/* Category Tag */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {post?.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
          {post?.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900">
                {post.author.username}
              </span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post.updatedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post?.readingTime}</span>
              </div>
            </div>
            {/* <p className="text-sm text-gray-500 mt-1">{post.author.bio}</p> */}
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>
      </header>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                {/* {post.content.intro} */}
              </p>

              <div
                className="tiptap max-w-none tiptap-img:rounded-lg tiptap-img:mx-auto tiptap-p:mb-4"
                dangerouslySetInnerHTML={{ __html: post.contentHTML }}
              />
            </div>

            {/* Social Share & Actions */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-8 mt-12">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? "bg-red-50 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{post.likes + (isLiked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 mr-2">Share:</span>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-16">
              <CommentAndReplies
                comments={comments}
                comment={comment}
                setComment={setComment}
                setComments={setComments}
                handleCommentSubmit={handleCommentSubmit}
                post={post}
                replyingTo={replyingTo}
              />
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8">
              {/* Author Card */}
              <AuthorCard post={post} />
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        <section className="mt-20 pb-16">
          <RelatedPosts relatedPosts={relatedPosts} />
        </section>
      </div>
    </article>
  );
};

export default BlogPostDetail;
