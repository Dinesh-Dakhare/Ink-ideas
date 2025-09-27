import React, { useState } from 'react';
import { Share, MessageCircle, Heart, Bookmark, Twitter, Linkedin, Facebook, Clock, Calendar, User,ArrowLeft } from 'lucide-react';
import RelatedPosts from '../component/RelatedPosts';
import CommentAndReplies from '../component/CommentAndReplies';
import AuthorCard from '../component/AuthorCard';

const BlogPostDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
      },
      content: "Great article! I've been struggling with scalable React architecture and this really helps clarify some best practices.",
      timestamp: "2 hours ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
          },
          content: "Thanks Alex! I'm glad you found it helpful. Let me know if you have any specific questions about implementing these patterns.",
          timestamp: "1 hour ago",
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
      },
      content: "The component architecture section is spot on. I especially appreciate the code examples - they make it so much easier to understand.",
      timestamp: "4 hours ago",
      likes: 8,
      isLiked: false,
      replies: []
    }
  ]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Mock data
  const post = {
    title: "Building Scalable React Applications: A Complete Guide to Modern Development Patterns",
    category: "React",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      bio: "Senior Frontend Engineer at TechCorp"
    },
    publishedDate: "March 15, 2024",
    readingTime: "12 min read",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    likes: 245,
    content: {
      intro: "React has evolved significantly over the years, and building scalable applications requires understanding modern patterns and best practices. In this comprehensive guide, we'll explore the architectural decisions that make React applications maintainable and performant at scale.",
      sections: [
        {
          heading: "Component Architecture",
          content: "When building large React applications, component architecture becomes crucial. The key is to create components that are reusable, testable, and follow the single responsibility principle."
        },
        {
          heading: "State Management Patterns",
          content: "Modern React applications benefit from thoughtful state management. Whether you choose Redux, Zustand, or React's built-in state management, consistency is key."
        }
      ]
    }
  };

  const relatedPosts = [
    {
      id: 1,
      title: "Advanced React Hooks: useCallback and useMemo",
      category: "React",
      readingTime: "8 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
      author: "Mike Johnson"
    },
    {
      id: 2,
      title: "TypeScript Best Practices for React Developers",
      category: "TypeScript",
      readingTime: "10 min read",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      author: "Emily Davis"
    },
    {
      id: 3,
      title: "Testing React Components with Jest and Testing Library",
      category: "Testing",
      readingTime: "15 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      author: "David Wilson"
    }
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face"
        },
        content: comment,
        timestamp: "Just now",
        likes: 0,
        isLiked: false,
        replies: []
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face"
        },
        content: replyText,
        timestamp: "Just now",
        likes: 0,
        isLiked: false
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      ));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === commentId 
                  ? { 
                      ...reply, 
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
    }
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className='flex items-center gap-2 my-5 '>
      <span className=' bg-blue-300 p-2 rounded-full  hover:cursor-pointer '><ArrowLeft className='hover:cursor-pointer  ' /></span>
      <p className='text-xl font-medium'>Back</p>
        </div>
        {/* Category Tag */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{post.author.name}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post.publishedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{post.author.bio}</p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>
      </header>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                {post.content.intro}
              </p>

              {post.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  {/* Code Example */}
                  {index === 0 && (
                    <div className="bg-gray-900 rounded-lg p-6 my-8 overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        <pre>{`// Example: Reusable Button Component
const Button = ({ variant = 'primary', children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  
  return (
    <button 
      className={\`\${baseStyles} \${variants[variant]}\`}
      {...props}
    >
      {children}
    </button>
  );
};`}</pre>
                      </code>
                    </div>
                  )}

                  {/* Blockquote */}
                  {index === 1 && (
                    <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-700 bg-gray-50 py-4">
                      "The best code is not just functional, but also maintainable and understandable by your future self and your teammates."
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {/* Social Share & Actions */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-8 mt-12">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes + (isLiked ? 1 : 0)}</span>
                </button>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 mr-2">Share:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-16">
              <CommentAndReplies comments={comments} comment={comment} setComment={setComment} handleCommentSubmit={handleCommentSubmit} replyingTo={replyingTo}/>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8">
              {/* Author Card */}
             <AuthorCard post={post}/>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        <section className="mt-20 pb-16">
   <RelatedPosts relatedPosts={relatedPosts}/>
        </section>
      </div>
    </article>
  );
};

export default BlogPostDetail;