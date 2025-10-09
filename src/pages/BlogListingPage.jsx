import React, { useState, useEffect, use } from "react";
import { getPosts } from "../services/postService.js";

import { Eye, Heart, MessageCircle, Clock, Calendar, User } from "lucide-react";
import Category from "../component/Category.jsx";
import CategoryList from "../component/CategoryList";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import BlogCards from "../component/BlogCards.jsx";
const BlogListingPage = () => {
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
  
 
    const filteredPosts =
      selectedCategory === "All"
        ? posts
        : recentPosts.filter((post) => post.category === selectedCategory);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts({page,limit:10,category:selectedCategory === "All" ? "" : selectedCategory});
  
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
  



  // Filter blogs based on selected category
  // useEffect(() => {
  //   const filtered =
  //     selectedCategory === "All"
  //       ? allBlogs
  //       : allBlogs.filter((blog) => blog.category === selectedCategory);

  //   setFilteredBlogs(filtered);
  //   setCurrentPage(1);
  //   setDisplayedBlogs(filtered.slice(0, BLOGS_PER_PAGE));
  // }, [selectedCategory]);

  // // Handle category selection
  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };

  // // Handle load more functionality
  // const handleLoadMore = () => {
  //   setLoading(true);

  //   // Simulate API delay
  //   setTimeout(() => {
  //     const nextPage = currentPage + 1;
  //     const startIndex = currentPage * BLOGS_PER_PAGE;
  //     const endIndex = startIndex + BLOGS_PER_PAGE;
  //     const nextBlogs = filteredBlogs.slice(startIndex, endIndex);

  //     setDisplayedBlogs((prev) => [...prev, ...nextBlogs]);
  //     setCurrentPage(nextPage);
  //     setLoading(false);
  //   }, 500);
  // };

  // // Format number with K suffix
  // const formatNumber = (num) => {
  //   if (num >= 1000) {
  //     return (num / 1000).toFixed(1) + "K";
  //   }
  //   return num.toString();
  // };

  // const hasMoreBlogs = displayedBlogs.length < filteredBlogs.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 relative ">
        <NavLink  to="/" className="absolute top-6 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm  rounded-full  hover:cursor-pointer flex gap-2 text-lg font-medium justify-start items-center">
          <ArrowLeft className="hover:cursor-pointer  " /> Back
        </NavLink>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
          {/* Category Filter */}
          <div className="pt-6">
            {/* <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            /> */}
          </div>
          <section className="py-20">
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
         <CategoryList posts={posts} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

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
            <NavLink to="/all-blogs" className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Load More Articles
            </NavLink >
          </div>
        </div>
      </section>
        </div>
      </div>

      {/* Main Content */}
     
    </div>
  );
};

export default BlogListingPage;
