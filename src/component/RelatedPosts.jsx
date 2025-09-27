import React from 'react'

const RelatedPosts = ({relatedPosts}) => {
  return (
    <>
           <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {relatedPost.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <span>{relatedPost.author}</span>
                  <span>•</span>
                  <span>{relatedPost.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
    </>
  )
}

export default RelatedPosts