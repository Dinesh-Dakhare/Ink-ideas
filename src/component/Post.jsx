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
const Post = () => {
  return (
   <div className="space-y-6">
            {/* Posts Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Posts</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                <FiPlus className="w-4 h-4 mr-2" />
                New Post
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select className="border border-gray-300 rounded-lg px-4 py-2">
                <option>All Posts</option>
                <option>Published</option>
                <option>Drafts</option>
                <option>Scheduled</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2">
                <option>All Categories</option>
                <option>Web Development</option>
                <option>JavaScript</option>
                <option>React</option>
              </select>
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { title: 'Getting Started with React Hooks', status: 'Published', category: 'React', views: 1247, date: '2024-01-15' },
                      { title: 'Modern CSS Grid Layouts', status: 'Draft', category: 'CSS', views: 0, date: '2024-01-14' },
                      { title: 'JavaScript ES6 Features', status: 'Published', category: 'JavaScript', views: 856, date: '2024-01-10' },
                      { title: 'Building Responsive Websites', status: 'Published', category: 'Web Dev', views: 2341, date: '2024-01-08' },
                      { title: 'Node.js Authentication', status: 'Scheduled', category: 'Node.js', views: 0, date: '2024-01-20' }
                    ].map((post, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === 'Published' ? 'bg-green-100 text-green-800' :
                            post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{post.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{post.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{post.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FiEdit3 className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <FiMoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Showing 1 to 5 of 47 posts</p>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
  )
}

export default Post