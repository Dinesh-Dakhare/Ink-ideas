import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit3,
  FiPlus,
} from "react-icons/fi";
import Header from "../component/Header";
import Categories from "../component/Categories";
import QuickActions from "../component/QuickActions";
import RecentBlogs from "../component/RecentBlogs";
import AnalyticsOverview from "../component/AnalyticsOverview";
import Post from "../component/Post";
import Setting from "../component/Setting";
import DashboardCard from "../component/DashboardCard";
import api from "../services/api.js";
const UserDashbord = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recentPosts, setRecentPosts] = useState([]);
  const[postStats,setPostStats]= useState([])
useEffect(()=>{
const handleDashboard = async() => {
  try {
    const res = await api.get("/api/v1/dashboard");
    console.log(res.data);
    setRecentPosts(res.data.recentPosts);
    setPostStats(res.data);
  } catch (error) {
    console.log(error);
    
  }
}
handleDashboard()
},[])

if(!postStats){
  return <div>Loading...</div>
}
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {["overview",  "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Welcome back, John!
                  </h2>
                  <p className="text-blue-100 mb-6">
                    You have 3 draft posts and 12 new comments to review.
                  </p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Create New Post
                  </button>
                </div>
                <div className="hidden md:block">
                  <FiEdit3 className="w-24 h-24 text-blue-200" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <DashboardCard postStats={postStats}/>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Posts */}
              <RecentBlogs recentPosts={recentPosts} />

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Categories */}
                <Categories postStats={postStats}/>

                {/* Quick Actions */}
                <QuickActions />
              </div>
            </div>
          </>
        )}

       

        {/* Settings Tab */}
        {activeTab === "settings" && <Setting />}
      </div>
    </div>
  );
};

export default UserDashbord;
