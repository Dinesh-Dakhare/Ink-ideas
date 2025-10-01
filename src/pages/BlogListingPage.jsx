import React, { useState, useEffect, use } from "react";

import { Eye, Heart, MessageCircle, Clock, Calendar, User } from "lucide-react";
import Category from "../component/Category.jsx";
import CategoryList from "../component/CategoryList";
import { ArrowLeft } from "lucide-react";
const BlogListingPage = () => {
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const BLOGS_PER_PAGE = 6;

  // Categories for filtering
  const categories = [
    "All",
    "Web Development",
    "React",
    "JavaScript",
    "CSS",
    "Backend",
    "Design",
    "TypeScript",
  ];

  // Mock blog data
  const allBlogs = [
    {
      id: 1,
      title: "Building Scalable React Applications: A Complete Guide",
      description:
        "Learn the best practices and patterns for creating maintainable React applications that can grow with your team and user base.",
      category: "React",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 15, 2024",
      readingTime: "12 min read",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      stats: {
        views: 2847,
        likes: 245,
        comments: 32,
      },
    },
    {
      id: 2,
      title: "Modern CSS Grid Layout Techniques",
      description:
        "Discover advanced CSS Grid techniques that will transform how you approach web layout design in 2024.",
      category: "CSS",
      author: {
        name: "Mike Johnson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 12, 2024",
      readingTime: "8 min read",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      stats: {
        views: 1923,
        likes: 187,
        comments: 24,
      },
    },
    {
      id: 3,
      title: "TypeScript Best Practices for Large Applications",
      description:
        "Essential TypeScript patterns and configurations for enterprise-level applications and development teams.",
      category: "TypeScript",
      author: {
        name: "Emily Davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 10, 2024",
      readingTime: "15 min read",
      coverImage:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      stats: {
        views: 3421,
        likes: 298,
        comments: 45,
      },
    },
    {
      id: 4,
      title: "Node.js Performance Optimization Guide",
      description:
        "Learn how to optimize your Node.js applications for better performance, scalability, and resource management.",
      category: "Backend",
      author: {
        name: "David Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 8, 2024",
      readingTime: "18 min read",
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      stats: {
        views: 2156,
        likes: 203,
        comments: 28,
      },
    },
    {
      id: 5,
      title: "Advanced JavaScript Patterns and Techniques",
      description:
        "Dive deep into advanced JavaScript concepts including closures, prototypes, and functional programming patterns.",
      category: "JavaScript",
      author: {
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 5, 2024",
      readingTime: "14 min read",
      coverImage:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
      stats: {
        views: 2789,
        likes: 234,
        comments: 41,
      },
    },
    {
      id: 6,
      title: "UX Design Principles for Web Applications",
      description:
        "Essential user experience design principles that every web developer should understand and implement.",
      category: "Design",
      author: {
        name: "Maria Garcia",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 3, 2024",
      readingTime: "10 min read",
      coverImage:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
      stats: {
        views: 1876,
        likes: 156,
        comments: 19,
      },
    },
    {
      id: 7,
      title: "Full-Stack Web Development Roadmap 2024",
      description:
        "A comprehensive guide to becoming a full-stack developer with the latest technologies and best practices.",
      category: "Web Development",
      author: {
        name: "Ryan Kim",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "March 1, 2024",
      readingTime: "20 min read",
      coverImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      stats: {
        views: 4123,
        likes: 387,
        comments: 62,
      },
    },
    {
      id: 8,
      title: "React Hooks Deep Dive: Advanced Patterns",
      description:
        "Master advanced React Hooks patterns including custom hooks, useCallback, useMemo, and performance optimization.",
      category: "React",
      author: {
        name: "Jessica Brown",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "February 28, 2024",
      readingTime: "16 min read",
      coverImage:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      stats: {
        views: 3567,
        likes: 312,
        comments: 48,
      },
    },
    {
      id: 9,
      title: "CSS Animations and Micro-interactions Guide",
      description:
        "Create engaging user experiences with smooth CSS animations, transitions, and thoughtful micro-interactions.",
      category: "CSS",
      author: {
        name: "Tom Anderson",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "February 25, 2024",
      readingTime: "11 min read",
      coverImage:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop",
      stats: {
        views: 2234,
        likes: 198,
        comments: 33,
      },
    },
    {
      id: 10,
      title: "Building RESTful APIs with Express.js",
      description:
        "Learn how to design and implement robust RESTful APIs using Express.js with proper error handling and validation.",
      category: "Backend",
      author: {
        name: "Lisa Wang",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "February 22, 2024",
      readingTime: "13 min read",
      coverImage:
        "https://images.unsplash.com/photo-1555949963-f7fe5cd04089?w=800&h=400&fit=crop",
      stats: {
        views: 2891,
        likes: 267,
        comments: 39,
      },
    },
    {
      id: 11,
      title: "Modern JavaScript ES2024 Features",
      description:
        "Explore the latest JavaScript features and syntax improvements that are changing how we write modern applications.",
      category: "JavaScript",
      author: {
        name: "Chris Martinez",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "February 20, 2024",
      readingTime: "9 min read",
      coverImage:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      stats: {
        views: 3145,
        likes: 289,
        comments: 52,
      },
    },
    {
      id: 12,
      title: "TypeScript Generic Types Masterclass",
      description:
        "Master TypeScript generics with practical examples and advanced patterns for type-safe, reusable code.",
      category: "TypeScript",
      author: {
        name: "Anna Schmidt",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=face",
      },
      publishDate: "February 18, 2024",
      readingTime: "17 min read",
      coverImage:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop",
      stats: {
        views: 2673,
        likes: 245,
        comments: 35,
      },
    },
  ];

  // Filter blogs based on selected category
  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? allBlogs
        : allBlogs.filter((blog) => blog.category === selectedCategory);

    setFilteredBlogs(filtered);
    setCurrentPage(1);
    setDisplayedBlogs(filtered.slice(0, BLOGS_PER_PAGE));
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle load more functionality
  const handleLoadMore = () => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * BLOGS_PER_PAGE;
      const endIndex = startIndex + BLOGS_PER_PAGE;
      const nextBlogs = filteredBlogs.slice(startIndex, endIndex);

      setDisplayedBlogs((prev) => [...prev, ...nextBlogs]);
      setCurrentPage(nextPage);
      setLoading(false);
    }, 500);
  };

  // Format number with K suffix
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const hasMoreBlogs = displayedBlogs.length < filteredBlogs.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 relative ">
        <span className="absolute top-6 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm  rounded-full  hover:cursor-pointer flex gap-2 text-lg font-medium justify-start items-center">
          <ArrowLeft className="hover:cursor-pointer  " /> Back
        </span>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
          {/* Category Filter */}
          <div className="pt-6">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-600">
            {selectedCategory === "All"
              ? "All articles"
              : `Articles in ${selectedCategory}`}{" "}
            ({filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "article" : "articles"})
          </p>
        </div>

        {/* Blog Grid */}
        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new
              content.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {displayedBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Cover Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  {/* Author & Meta Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {blog.author.name}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{blog.publishDate}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{blog.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">
                        {formatNumber(blog.stats.views)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">
                        {formatNumber(blog.stats.likes)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{blog.stats.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMoreBlogs && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                "Load More Articles"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListingPage;
