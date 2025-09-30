import React,{useState} from 'react'
import { useEffect } from 'react';
import {
  FiUser,
  FiEye,
  FiAward,
  FiArrowRight,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
const FeaturedPostsCarouse = () => {
      const [currentSlide, setCurrentSlide] = useState(0);
    
     const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt:
        "Discover the cutting-edge technologies and methodologies that are reshaping how we build web applications.",
      image:
        "backend/uploads/1759203172779.jpg",
      category: "Web Development",
      author: "John Doe",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      views: "2.1K",
    },
    {
      id: 2,
      title: "Mastering React Hooks: Advanced Patterns and Best Practices",
      excerpt:
        "Learn how to leverage React Hooks effectively to build more maintainable and performant applications.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      category: "React",
      author: "Sarah Johnson",
      date: "Jan 12, 2024",
      readTime: "12 min read",
      views: "3.4K",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: Choosing the Right Layout Method",
      excerpt:
        "A comprehensive guide to understanding when and how to use CSS Grid and Flexbox for your layouts.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      category: "CSS",
      author: "Mike Chen",
      date: "Jan 10, 2024",
      readTime: "6 min read",
      views: "1.8K",
    },
  ];

    useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredPosts.map((post) => (
                  <div key={post.id} className="w-full flex-shrink-0">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                          {post.category}
                        </span>
                        <h3 className="text-3xl font-bold mb-3">
                          {post.title}
                        </h3>
                        <p className="text-gray-200 mb-4 text-lg">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-gray-300">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                          <span className="mx-2">•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + featuredPosts.length) % featuredPosts.length
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
  )
}

export default FeaturedPostsCarouse