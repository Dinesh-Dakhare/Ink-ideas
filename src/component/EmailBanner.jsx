import React from 'react'

const EmailBanner = () => {
  return (
         <section id='about' className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest articles and tutorials delivered straight to your
            inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-4 focus:ring-white/25 focus:outline-none bg-white"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>
  )
}

export default EmailBanner