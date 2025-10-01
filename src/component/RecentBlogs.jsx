import React from 'react'
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
  FiTrendingDown
//   FiBarChart3
} from 'react-icons/fi';
const RecentBlogs = ({recentPosts}) => {

  if(!recentPosts) return <div>Loading...</div>
  return (
                  <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">Recent Posts</h3>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View all</button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentPosts?.map((post) => (
                    <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h4>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <FiMoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status}
                          </span> */}
                          <div className="flex items-center">
                            <FiEye className="w-4 h-4 mr-1" />
                            {post?.views?.length}
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
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  )
}

export default RecentBlogs