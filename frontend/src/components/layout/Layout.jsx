import React from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-white font-sans">
            <div className="max-w-7xl mx-auto flex">
                {/* Left Sidebar */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 border-r border-gray-800 md:ml-64 lg:mr-80">
                    {children}
                </main>

                {/* Right Sidebar */}
                <aside className="hidden lg:block w-80 flex-shrink-0">
                    <RightSidebar />
                </aside>
            </div>
        </div>
    );
};

export default Layout;
