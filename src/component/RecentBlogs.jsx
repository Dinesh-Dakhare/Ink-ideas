import React,{useState,useEffect} from "react";
import {
  FiEdit3,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiPlus,
  FiBell,
  FiSettings,
  FiSearch,
  FiMoreHorizontal,
  FiCalendar,
  FiTrendingDown,
  //   FiBarChart3
} from "react-icons/fi";
import { MdOutlineCancel ,MdDelete,MdEditNote  } from "react-icons/md";
import formatDateToMonth from "../../backend/services/dataFormate";
import api from "../services/api.js";
import { set } from "mongoose";
const RecentBlogs = ({ recentPosts }) => {
  console.log(recentPosts);
 const [activeDropdown, setActiveDropdown] = useState(null);
const [deletePost,setDeletePost] = useState(false)
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

    const handleDeletePost = async(postId)=>{
    try {
      const res = await api.delete(`/api/v1/blogs/${postId}`)
      if(res.status === 200){
        alert(res.data.message);
        setDeletePost(true)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  const loadMoreBlogs=()=>{

  }
useEffect(() => {
  return () => {
    setActiveDropdown(null);
    setDeletePost(false)
  };
}, [deletePost]);

  if (!recentPosts) return <div>Loading...</div>;
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Recent Posts</h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium" onClick={() => loadMoreBlogs()}>
            View all
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200 relative">
        {recentPosts?.map((post) => (
          <div key={post._id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h4>
              <button className="p-1 hover:bg-gray-200 rounded">
                <FiMoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => toggleDropdown(post._id)}/>
              </button>
              {activeDropdown === post._id ? (
                <div className="absolute right-3 bg-white border border-gray-200 rounded-md cursor-pointer p-4 ">
                  <ul className="space-y-2">
                    <li className="flex items-center justify-end group" onClick={() => setActiveDropdown(null)}><MdOutlineCancel className="text-lg text-gray-500 group-hover:text-black "/></li>
                    <li className="flex items-center gap-1 text-lg   group" onClick={()=>handleDeletePost(post._id)}><MdDelete className="group-hover:text-red-500 text-lg"/> Delete</li>
                    <li className="flex items-center gap-1 text-lg group"><MdEditNote className=" text-xl group-hover:text-blue-500"/>Edit</li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {/* <p>{post?.category}</p> */}
                <div className="flex items-center">
                  <FiEye className="w-4 h-4 mr-1" />
                  {post?.views}
                </div>
                <div className="flex items-center">
                  <FiHeart className="w-4 h-4 mr-1" />
                  {post?.likes?.length}
                </div>
                <div className="flex items-center">
                  <FiMessageCircle className="w-4 h-4 mr-1" />
                  {post?.comments?.length}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {formatDateToMonth(post?.updatedAt)}
              </span>
            </div>
          </div>
        ))}
        <div>
          pagenation
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
