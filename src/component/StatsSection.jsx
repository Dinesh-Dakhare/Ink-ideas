import React from 'react'
import {FiUser,FiEye,FiAward} from 'react-icons/fi'
const StatsSection = () => {
      const stats = [
        { label: "Articles Published", value: "250+", icon: FiUser },
        { label: "Happy Readers", value: "50K+", icon: FiUser },
        { label: "Monthly Views", value: "2M+", icon: FiEye },
        { label: "Expert Authors", value: "25+", icon: FiAward },
      ];
    
  return (
    <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default StatsSection