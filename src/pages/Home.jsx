import React, { use, useEffect, useState } from "react";
import Header from "../component/Header.jsx";

import { FiArrowRight, FiPlay } from "react-icons/fi";

import BlogCards from "../component/BlogCards.jsx";
import Footer from "../component/Footer.jsx";
import EmailBanner from "../component/EmailBanner.jsx";
import FeaturedPostsCarouse from "../component/FeaturedPostsCarouse.jsx";
import StatsSection from "../component/StatsSection.jsx";
import { NavLink } from "react-router-dom";
import CategoryList from "../component/CategoryList.jsx";
import { getPosts } from "../services/postService.js";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
const [page,setPage]=useState(1)
const [currentPage,setCurrentPage]=useState(1)
const [posts, setPosts] = useState([]);
const [totalPosts, setTotalPosts] = useState(0);
const [loading, setLoading] = useState(false);
  const recentPosts = [
    {
      id: 4,
      title: "Building Scalable APIs with Node.js and Express",
      excerpt:
        "Learn the fundamentals of creating robust, scalable backend services.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      category: "Backend",
      author: "Alex Wilson",
      date: "Jan 8, 2024",
      readTime: "10 min read",
      views: "1.2K",
      likes: 89,
      comments: 23,
    },
    {
      id: 5,
      title: "JavaScript ES2024: New Features You Should Know",
      excerpt:
        "Explore the latest JavaScript features and how they can improve your code.",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      category: "JavaScript",
      author: "Emily Davis",
      date: "Jan 5, 2024",
      readTime: "7 min read",
      views: "2.7K",
      likes: 156,
      comments: 34,
    },
    {
      id: 6,
      title: "Responsive Design Best Practices for 2024",
      excerpt:
        "Create websites that look great on every device with these proven techniques.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "Design",
      author: "David Lee",
      date: "Jan 3, 2024",
      readTime: "5 min read",
      views: "1.9K",
      likes: 78,
      comments: 12,
    },
    {
      id: 7,
      title: "Getting Started with TypeScript: A Beginner's Guide",
      excerpt:
        "Learn how TypeScript can make your JavaScript code more robust and maintainable.",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      category: "TypeScript",
      author: "Lisa Park",
      date: "Dec 30, 2023",
      readTime: "9 min read",
      views: "3.1K",
      likes: 124,
      comments: 28,
    },
  ];

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

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : recentPosts.filter((post) => post.category === selectedCategory);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await getPosts({page,limit:6,category:selectedCategory === "All" ? "" : selectedCategory});

      console.log(res);
      setCurrentPage(res.currentPage)
      setTotalPosts(res.totalPosts)
      setPosts(res.posts);
      setPage(res.totalPosts)
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, [selectedCategory]);
// if(!posts.length) return <div>Loading...</div>
  return (
    <div id="home" className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section with Featured Carousel */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Amazing
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore cutting-edge web development tutorials, industry insights,
              and expert tips from our community of passionate developers and
              designers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to={"/blog-editor"} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                Start Reading
                <FiArrowRight className="ml-2 w-5 h-5" />
              </NavLink>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <FiPlay className="mr-2 w-5 h-5" />
                Watch Intro
              </button>
            </div>
          </div>

          {/* Featured Posts Carousel */}
          <FeaturedPostsCarouse />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Recent Articles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest trends and tutorials
            </p>
          </div>

          {/* Category Filter */}
         <CategoryList posts={posts} categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

          {/* Articles Grid */}
          <div id="articles" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {
              !posts?.length && <div className="text-center text-2xl font-bold text-gray-900 mb-4">No Articles Found</div>
            }
            {posts?.map((post) => (
              <BlogCards post={post} key={post.id} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <EmailBanner />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
