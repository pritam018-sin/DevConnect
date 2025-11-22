import React from 'react';
import { Image, Code, Link as LinkIcon, Send } from 'lucide-react';

const CreatePost = () => {
    return (
        <div className="bg-surface rounded-2xl p-4 mb-6 border border-gray-800">
            <div className="flex gap-4">
                <img
                    src="https://i.pravatar.cc/150?u=me"
                    alt="Current User"
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                    <textarea
                        placeholder="What's on your mind, developer?"
                        className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none min-h-[80px]"
                    />
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                        <div className="flex gap-4 text-primary">
                            <button className="hover:bg-primary/10 p-2 rounded-lg transition-colors">
                                <Code size={20} />
                            </button>
                            <button className="hover:bg-primary/10 p-2 rounded-lg transition-colors">
                                <Image size={20} />
                            </button>
                            <button className="hover:bg-primary/10 p-2 rounded-lg transition-colors">
                                <LinkIcon size={20} />
                            </button>
                        </div>
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
                            <span>Post</span>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
