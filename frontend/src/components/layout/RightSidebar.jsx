import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const RightSidebar = () => {
    const whoToFollow = [
        { name: 'Jane Doe', handle: '@janedoe_dev', avatar: 'https://i.pravatar.cc/150?u=1' },
        { name: 'John Smith', handle: '@jsmith_codes', avatar: 'https://i.pravatar.cc/150?u=2' },
    ];

    const trendingRepos = [
        { name: 'awesome-ai-tools', desc: 'A curated list of AI-powered developer tools.' },
        { name: 'react-fiber-visualizer', desc: 'Visualize the React Fiber tree in real-time.' },
        { name: 'oss-houdini-magic', desc: 'Next-gen CSS features with Houdini.' },
    ];

    return (
        <div className="fixed right-0 top-0 h-screen w-80 bg-background border-l border-gray-800 p-4 hidden lg:flex flex-col gap-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search DevConnects..."
                    className="w-full bg-surface text-white pl-10 pr-4 py-3 rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                />
            </div>

            {/* Who to Follow */}
            <div className="bg-surface rounded-2xl p-4 border border-gray-800">
                <h3 className="text-white font-bold mb-4">Who to Follow</h3>
                <div className="space-y-4">
                    {whoToFollow.map((user, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="text-white text-sm font-medium">{user.name}</p>
                                    <p className="text-gray-400 text-xs">{user.handle}</p>
                                </div>
                            </div>
                            <button className="bg-white text-black px-3 py-1 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Repos */}
            <div className="bg-surface rounded-2xl p-4 border border-gray-800">
                <h3 className="text-white font-bold mb-4">Trending Repos</h3>
                <div className="space-y-4">
                    {trendingRepos.map((repo, index) => (
                        <div key={index} className="group cursor-pointer">
                            <h4 className="text-primary font-medium text-sm group-hover:underline">{repo.name}</h4>
                            <p className="text-gray-400 text-xs mt-1">{repo.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
