import React ,{ useEffect, useState} from 'react'
import { 
  FiBell, 
  FiMessageCircle, 
  FiHeart, 
  FiUserPlus, 
  FiTrendingUp, 
  FiEdit3,
  FiX,
  FiCheck,
  FiTrash2,
  FiSettings,
  FiFilter,
  FiMoreHorizontal
} from 'react-icons/fi';
const Notification = ({notifications, setNotifications,isOpen,setIsOpen}) => {
  //  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     type: 'comment',
  //     title: 'New comment on your post',
  //     message: 'Sarah Johnson commented on "Getting Started with React Hooks"',
  //     time: '2 minutes ago',
  //     read: false,
  //     avatar: 'SJ',
  //     postTitle: 'Getting Started with React Hooks'
  //   },
  //   {
  //     id: 2,
  //     type: 'like',
  //     title: 'Your post received new likes',
  //     message: '5 people liked your post "Modern CSS Grid Layouts"',
  //     time: '15 minutes ago',
  //     read: false,
  //     avatar: null,
  //     postTitle: 'Modern CSS Grid Layouts'
  //   },
  //   {
  //     id: 3,
  //     type: 'follower',
  //     title: 'New follower',
  //     message: 'Alex Chen started following you',
  //     time: '1 hour ago',
  //     read: true,
  //     avatar: 'AC',
  //     postTitle: null
  //   },
  //   {
  //     id: 4,
  //     type: 'analytics',
  //     title: 'Weekly analytics report',
  //     message: 'Your blog had 2.4K views this week (+18% from last week)',
  //     time: '2 hours ago',
  //     read: true,
  //     avatar: null,
  //     postTitle: null
  //   },
  //   {
  //     id: 5,
  //     type: 'comment',
  //     title: 'New comment on your post',
  //     message: 'Mike Wilson replied to your comment on "JavaScript ES6 Features"',
  //     time: '3 hours ago',
  //     read: true,
  //     avatar: 'MW',
  //     postTitle: 'JavaScript ES6 Features'
  //   },
  //   {
  //     id: 6,
  //     type: 'post',
  //     title: 'Post published successfully',
  //     message: 'Your post "Building Responsive Websites" is now live',
  //     time: '1 day ago',
  //     read: true,
  //     avatar: null,
  //     postTitle: 'Building Responsive Websites'
  //   },
  //   {
  //     id: 7,
  //     type: 'like',
  //     title: 'Milestone reached!',
  //     message: 'Your post "JavaScript Tips" reached 1,000 likes!',
  //     time: '2 days ago',
  //     read: true,
  //     avatar: null,
  //     postTitle: 'JavaScript Tips'
  //   }
  // ]);


  const getNotificationIcon = (type) => {
    switch (type) {
      case 'comment':
        return <FiMessageCircle className="w-5 h-5" />;
      case 'like':
        return <FiHeart className="w-5 h-5" />;
      case 'follower':
        return <FiUserPlus className="w-5 h-5" />;
      case 'analytics':
        return <FiTrendingUp className="w-5 h-5" />;
      case 'post':
        return <FiEdit3 className="w-5 h-5" />;
      default:
        return <FiBell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'comment':
        return 'text-blue-600 bg-blue-50';
      case 'like':
        return 'text-red-600 bg-red-50';
      case 'follower':
        return 'text-green-600 bg-green-50';
      case 'analytics':
        return 'text-purple-600 bg-purple-50';
      case 'post':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };
  return (
      <div className="relative">
      {/* Notification Bell Button */}
 
                                  
      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            // onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex space-x-1 text-sm">
                {[
                  { key: 'all', label: 'All', count: notifications.length },
                  { key: 'unread', label: 'Unread', count: unreadCount },
                  { key: 'comment', label: 'Comments', count: notifications.filter(n => n.type === 'comment').length },
                  { key: 'like', label: 'Likes', count: notifications.filter(n => n.type === 'like').length }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      activeFilter === filter.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <span className="ml-1 text-xs">({filter.count})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            {notifications.length > 0 && (
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center text-sm">
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    disabled={unreadCount === 0}
                  >
                    <FiCheck className="w-4 h-4 mr-1" />
                    Mark all as read
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
                    <FiTrash2 className="w-4 h-4 mr-1" />
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon or Avatar */}
                      <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                        {notification.avatar ? (
                          <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            {notification.avatar}
                          </div>
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            {notification.postTitle && (
                              <p className="text-xs text-blue-600 mt-1 font-medium">
                                "{notification.postTitle}"
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                title="Mark as read"
                              >
                                <FiCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                              title="Delete notification"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full absolute left-1 top-1"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FiBell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No notifications</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {activeFilter === 'all' 
                      ? "You're all caught up!" 
                      : `No ${activeFilter} notifications`}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Notification