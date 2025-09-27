import React from 'react'
import { 

  FiPlus,
 
  FiCalendar,
  
//   FiBarChart3
} from 'react-icons/fi';

const QuickActions = () => {
  return (
             <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                          <FiPlus className="w-5 h-5 mr-3 text-blue-600" />
                          <span>New Post</span>
                        </button>
                        <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                          {/* <FiBarChart3 className="w-5 h-5 mr-3 text-green-600" /> */}
                          <span>View Analytics</span>
                        </button>
                        <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                          <FiCalendar className="w-5 h-5 mr-3 text-purple-600" />
                          <span>Schedule Post</span>
                        </button>
                      </div>
                    </div>
  )
}

export default QuickActions