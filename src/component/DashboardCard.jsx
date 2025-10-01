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
const DashboardCard = ({postStats}) => {
  
    
      const stats = [
        { label: 'Total Posts', value: postStats?.totalPosts, change: '+12%', icon: FiFileText },
        { label: 'Total Views', value: postStats?.totalViews, change: '+18%', icon: FiEye },
        { label: 'Followers', value: '2', change: '+7%', icon: FiUsers },
        { label: 'Engagement', value: postStats?.engagement, change: '+2.1%', icon: FiHeart }
      ];
    
  return (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-blue-50`}>
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
  )
}

export default DashboardCard