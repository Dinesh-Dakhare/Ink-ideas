import React from 'react'

const Categories = () => {
      const topCategories = [
    { name: 'Web Development', posts: 23, color: 'bg-blue-500' },
    { name: 'JavaScript', posts: 18, color: 'bg-yellow-500' },
    { name: 'React', posts: 15, color: 'bg-cyan-500' },
    { name: 'CSS', posts: 12, color: 'bg-purple-500' },
    { name: 'Tutorials', posts: 8, color: 'bg-green-500' }
  ];
  return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                      <div className="space-y-3">
                        {topCategories.map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${category.color}`}></div>
                              <span className="text-gray-700">{category.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">{category.posts}</span>
                          </div>
                        ))}
                      </div>
                    </div>
  )
}

export default Categories