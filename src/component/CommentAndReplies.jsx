import React, { useState } from "react";
import { MessageCircle, Heart } from "lucide-react";
import { useUser } from "../context/userContext.jsx";
import api from "../services/api.js";
const CommentAndReplies = ({
  comments,
  // comment,
  // setComment,
  // handleCommentSubmit,
  handleLikeComment,
  replyingTo,
  post,
  setComments,
  page,
  limit,
  setPage,
  totalComments,
  setReplyingTo,
  repliesId,
  setRepliesId,
  replyText,
  setReplyText,
  setReloadReplies,
  reloadReplies,
}) => {
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const handleCommentSubmit = async (comment, repliesId) => {
    if (!comment.trim()) return;

    try {
      const res = await api.post("/api/v1/comment", {
        postId: post._id,
        content: comment,
        repliesId: repliesId || null,
      });

      if (res.status === 201) {
        console.log(res.data);
        setReloadReplies(!reloadReplies);
        setComment("");
        setReplyText("");
        setRepliesId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <MessageCircle className="w-6 h-6" />
        <span>Comments ({comments?.length})</span>
      </h3>

      {/* New Comment Form */}
      <div className="mb-8">
        <div className="flex space-x-3">
          <img
            src={`/backend${user?.avatar}`}
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleCommentSubmit(comment)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                // disabled={comment.trim() === ''}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Be the first to comment on this post!</p>
          </div>
        ) : (
          comments?.map((comment) => (
            <div
              key={comment?._id}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              {/* Main Comment */}
              <div className="flex space-x-3">
                <img
                  src={`/backend${comment?.author?.avatar}`}
                  alt={comment?.author?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {comment?.author.username}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">timestamp</span>
                    </div>
                    <p className="text-gray-700">{comment?.content}</p>
                  </div>

                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4 mt-2 ml-4">
                    <button
                      onClick={() => handleLikeComment(comment?._id)}
                      className={`flex items-center space-x-1 text-sm transition-colors ${
                        comment?.isLiked
                          ? "text-red-600"
                          : "text-gray-500 hover:text-red-600"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 cursor-pointer ${
                          comment?.isLiked ? "fill-current" : ""
                        }`}
                      />
                      <span>{comment?.likes?.length}</span>
                    </button>
                    <button
                      onClick={() =>
                        setRepliesId(
                          repliesId === comment?._id ? null : comment?._id
                        )
                      }
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Reply
                    </button>
                  </div>

                  {/* Reply Form */}
                  {repliesId === comment?._id && (
                    <div className="mt-4 ml-4">
                      <div className="flex space-x-3">
                        <img
                          src={`/backend${comment?.author?.avatar}`}
                          alt={comment?.author?.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment?.author.username}...`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                            rows={3}
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => {
                                setRepliesId(null);
                                setReplyText("");
                              }}
                              className="px-4 py-1.5 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                handleCommentSubmit(replyText, comment?._id)
                              }
                              className="px-4 py-1.5 bg-blue-600 text-white text-sm cursor-pointer rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!replyText.trim()}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment?.replies && comment?.replies.length > 0 && (
                    <div className="mt-4 ml-4 space-y-4">
                      {comment?.replies?.map((reply) => (
                        <div key={reply?._id} className="flex space-x-3">
                          <img
                            src={`/backend${reply?.author.avatar}`}
                            alt={reply?.author.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">
                                  {reply?.author.username}
                                </span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">
                                  replies
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">
                                {reply?.content}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 ml-3">
                              <button
                                onClick={() => handleLikeComment(reply?._id)}
                                className={`flex items-center space-x-1 cursor-pointer text-xs transition-colors ${
                                  reply?.isLiked
                                    ? "text-red-600"
                                    : "text-gray-500 hover:text-red-600"
                                }`}
                              >
                                <Heart
                                  className={`w-3 h-3 ${
                                    reply?.isLiked ? "fill-current" : ""
                                  }`}
                                />
                                <span>{reply?.likes?.length}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {/* Load More */}
        {page < totalComments && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              Load more comments
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentAndReplies;
