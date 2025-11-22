import React from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Bookmark } from 'lucide-react';

const PostCard = ({ post }) => {
    return (
        <div className="bg-surface rounded-2xl p-6 mb-4 border border-gray-800 hover:border-gray-700 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="font-bold text-white">{post.author.name}</h3>
                        <span className="text-gray-400 text-sm">{post.createdAt}</span>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>

                {post.codeSnippet && (
                    <div className="bg-background rounded-xl p-4 font-mono text-sm text-gray-300 overflow-x-auto border border-gray-800">
                        <pre>{post.codeSnippet}</pre>
                    </div>
                )}

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post content"
                        className="rounded-xl w-full mt-4 border border-gray-800"
                    />
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors group">
                        <Heart size={20} className="group-hover:fill-pink-500" />
                        <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group">
                        <MessageSquare size={20} className="group-hover:fill-blue-500" />
                        <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors group">
                        <Share2 size={20} className="group-hover:fill-green-500" />
                        <span>{post.shares}</span>
                    </button>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors">
                    <Bookmark size={20} />
                </button>
            </div>
        </div>
    );
};

export default PostCard;
