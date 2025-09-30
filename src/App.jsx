import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashbord from './pages/UserDashbord';
import Notification from './pages/Notification';
import BlogEditor from './pages/BlogEditor';
import BlogPostDetail from './pages/BlogPostDetail';
import BlogListingPage from './pages/BlogListingPage';


function App() {
  
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashbord />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />
        <Route path="/all-blogs" element={<BlogListingPage />} />


        <Route path="/blog-editor" element={<BlogEditor />} />



        {/* <Route path="/logout" element={<Logout />} /> */}

        {/* fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
