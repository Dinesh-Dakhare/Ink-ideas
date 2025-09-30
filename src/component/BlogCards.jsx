import React from "react";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiEye,
  FiAward,
  FiArrowRight,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiMessageCircle,
  FiShare2,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const stripImagesFromHTML = (html) => {
  return html.replace(/<img[^>]*>/g, "").replace(/<h1[^>]*>.*?<\/h1>/gi, ""); // removes <img> tags
};

const BlogCards = ({ post }) => {
  console.log(post);
  const handleBlogView = () => {};
  return (
    <article
      key={post._id}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group hover:cursor-pointer"
    >
      <div className="relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        <div
          className="text-gray-700 text-sm line-clamp-3 tiptap max-w-none break-words whitespace-normal"
          dangerouslySetInnerHTML={{
            __html: stripImagesFromHTML(post.contentHTML),
          }}
        />
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FiUser className="w-4 h-4 mr-1" />
              {post.author.username}
            </div>
            <div className="flex items-center">
              <FiCalendar className="w-4 h-4 mr-1" />
              {/* {post.date} */}
            </div>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <NavLink
              to={`/blog/${post.slug}`}
              state={{ post }}
              className="flex items-center"
            >
              <FiEye className="w-4 h-4 mr-1" onClick={handleBlogView} />
              {post.views}
            </NavLink>
            <div className="flex items-center">
              <FiHeart className="w-4 h-4 mr-1" />
              {post.likes}
            </div>
            <div className="flex items-center">
              <FiMessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              {/* <FiBookmark className="w-4 h-4" /> */}
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCards;
