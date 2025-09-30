import React from 'react'

const AuthorCard = ({post}) => {
  return (
     <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.author.username}</h4>
                    <p className="text-sm text-gray-600">{post.author.bio}</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Follow
                </button>
              </div>
  )
}

export default AuthorCard