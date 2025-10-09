import React from 'react'

const CategoryList = ({posts, selectedCategory, setSelectedCategory}) => {
  console.log(posts);
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
            {posts?.map((post) => (
              <button
                key={post._id}
                onClick={() => setSelectedCategory(post.category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === post.category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {(post.category).charAt(0).toUpperCase() + (post.category).slice(1)}
              </button>
            ))}
          </div>
  )
}

export default CategoryList