import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
<footer id='contact' className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">BlogSpace</h3>
              <p className="text-gray-400 mb-4">
                Your go-to destination for web development insights and
                tutorials.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Articles", "Categories", "About", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Categories</h4>
              <ul className="space-y-2">
                {[
                  "Web Development",
                  "React",
                  "JavaScript",
                  "CSS",
                  "Backend",
                ].map((category) => (
                  <li key={category}>
                    <a href="#" className="hover:text-white transition-colors">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">Follow us for updates</p>
              <div className="flex space-x-4">
                {/* Social media links would go here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 BlogSpace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer