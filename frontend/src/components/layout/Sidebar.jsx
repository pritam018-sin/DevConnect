import React from 'react';
import { Home, Compass, MessageSquare, User, Users, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Compass, label: 'Explore', path: '/explore' },
        { icon: MessageSquare, label: 'Messages', path: '/messages' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    const communities = [
        { name: 'Frontend Wizards', icon: Users },
        { name: 'Rust Lang Crew', icon: Users },
        { name: 'AI & Machine Learning', icon: Users },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-gray-800 p-4 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">D</span>
                </div>
                <h1 className="text-2xl font-bold text-white">DevConnects</h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-surface text-primary font-medium'
                                    : 'text-gray-400 hover:bg-surface/50 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Communities */}
            <div className="mt-8">
                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider px-4 mb-4">
                    Communities
                </h3>
                <div className="space-y-1">
                    {communities.map((community, index) => (
                        <button
                            key={index}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-surface/50 rounded-lg transition-colors text-sm"
                        >
                            <community.icon size={16} />
                            <span className="truncate">{community.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Create Post Button */}
            <button className="mt-auto w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                <Plus size={20} />
                Create Post
            </button>
        </div>
    );
};

export default Sidebar;
