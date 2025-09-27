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
const AnalyticsOverview = () => {
  return (
      <div className="space-y-8">
                {/* Analytics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Page Views', value: '24.8K', change: '+15.3%', icon: FiEye },
                    { label: 'Unique Visitors', value: '18.2K', change: '+8.7%', icon: FiUsers },
                    { label: 'Avg. Session', value: '3m 42s', change: '+12.1%', icon: FiTrendingUp },
                    { label: 'Bounce Rate', value: '42.3%', change: '-5.2%', icon: FiTrendingDown }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-purple-50">
                          <stat.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
    
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Traffic Chart */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Traffic Overview</h3>
                      <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </div>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[40, 65, 45, 80, 55, 70, 90, 75, 85, 60, 95, 85, 75, 90].map((height, index) => (
                        <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                      <span>Jan 1</span>
                      <span>Jan 15</span>
                      <span>Jan 30</span>
                    </div>
                  </div>
    
                  {/* Top Posts */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'React Best Practices', views: '3.2K', engagement: '8.5%' },
                        { title: 'CSS Grid Tutorial', views: '2.8K', engagement: '7.2%' },
                        { title: 'JavaScript Tips', views: '2.4K', engagement: '6.8%' },
                        { title: 'Web Performance', views: '1.9K', engagement: '5.9%' },
                        { title: 'Node.js Guide', views: '1.6K', engagement: '5.1%' }
                      ].map((post, index) => (
                        <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{post.title}</p>
                            <p className="text-sm text-gray-600">{post.views} views</p>
                          </div>
                          <span className="text-sm font-medium text-green-600">{post.engagement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
    
                {/* Detailed Analytics */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Traffic Sources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { source: 'Direct', percentage: 45, visitors: '11.2K', color: 'bg-blue-500' },
                      { source: 'Search Engines', percentage: 35, visitors: '8.7K', color: 'bg-green-500' },
                      { source: 'Social Media', percentage: 20, visitors: '5.0K', color: 'bg-purple-500' }
                    ].map((source, index) => (
                      <div key={index} className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                          <div className={`absolute inset-0 rounded-full border-8 border-t-8 ${source.color}`} style={{ 
                            transform: `rotate(${(source.percentage / 100) * 360}deg)` 
                          }}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900">{source.percentage}%</span>
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{source.source}</h4>
                        <p className="text-sm text-gray-600">{source.visitors} visitors</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  )
}

export default AnalyticsOverview