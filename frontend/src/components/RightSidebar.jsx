import React from 'react';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
    return (
        <aside className="w-80 fixed right-0 h-screen p-6 flex flex-col gap-8 border-l border-primary/10 bg-background-dark/50 backdrop-blur-md">
            {/* Search */}
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                <input className="w-full bg-glass border border-slate-800 rounded-full py-3 pl-12 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="Search Pulse..." type="text" />
            </div>

            {/* Trending Tags */}
            <div className="flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    Trending Tags
                </h2>
                <div className="flex flex-col gap-1">
                    <a className="p-3 rounded-xl hover:bg-glass flex items-center justify-between group" href="#">
                        <span className="text-slate-300 font-medium">#webgpu</span>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">1.2k</span>
                    </a>
                    <a className="p-3 rounded-xl hover:bg-glass flex items-center justify-between group" href="#">
                        <span className="text-slate-300 font-medium">#nextjs15</span>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">840</span>
                    </a>
                    <a className="p-3 rounded-xl hover:bg-glass flex items-center justify-between group" href="#">
                        <span className="text-slate-300 font-medium">#zig-lang</span>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">425</span>
                    </a>
                    <a className="p-3 rounded-xl hover:bg-glass flex items-center justify-between group" href="#">
                        <span className="text-slate-300 font-medium">#ai-agents</span>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">3.1k</span>
                    </a>
                </div>
            </div>

            {/* Recommended Developers */}
            <div className="flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    Recommended
                </h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCg2JiF4REQYNmA4fEcTw983Q8H9oSMcQ2-rr-WLzJu7rNONt65xJGzZnvXuJwy6rDTA_vKg2NYOiHdKVl1FJqe1BJVbuvDucdxdhPs_cR85CMbMQ_3sMQKdeJ-sb09S5LRRKPSyagALZSFCV37ccJKpWn-t047jjXtTvd24bmsSXPf5HyWBVegFN3h7u7Ezc3KfEG8jPNS1GLIpyvaOOcOojMJDa9Ix71q3MRz_XOMbcYIHv19nRvjrxdET7uU2EXGFqgj_5Z6Qw')" }}></div>
                            <div>
                                <p className="text-sm font-bold text-slate-200">Elena K.</p>
                                <p className="text-xs text-slate-500">VR/AR Architect</p>
                            </div>
                        </div>
                        <button className="text-primary hover:text-white transition-colors">
                            <span className="material-symbols-outlined">add_circle</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMSPhj6rDisvDX-KmFCaoBhwtsL2HFCNFwELJhAGJo07ZAFOgs27FWAac0oODKuhFzX1s3x2CWUv6QNGNOE70dkIiymWAJkeYmfK4tr8JcWjr_yQYvkLieC0eKpgOdvErL24dcd0a4vrQG4qb0I9NgRL3lgfD1MdxYbj3B1dx8J6oQgGcJ5h9q2GdArBywTPQGLJSQ594KP_Fg_JrszeTurtThIywDEHkxmBNqCshflm4ZiQ5S7ftZHQG57SKlyoJOnoefwEIG8A')" }}></div>
                            <div>
                                <p className="text-sm font-bold text-slate-200">Dave Sec</p>
                                <p className="text-xs text-slate-500">InfoSec Dev</p>
                            </div>
                        </div>
                        <button className="text-primary hover:text-white transition-colors">
                            <span className="material-symbols-outlined">add_circle</span>
                        </button>
                    </div>
                </div>
                <button className="text-sm text-slate-500 font-medium mt-2 hover:text-slate-300 transition-colors">View all suggestions</button>
            </div>

            {/* Footer Small */}
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                <a className="hover:text-primary" href="#">About</a>
                <a className="hover:text-primary" href="#">Rules</a>
                <a className="hover:text-primary" href="#">API</a>
                <a className="hover:text-primary" href="#">Privacy</a>
                <span>© 2024 DevConnect</span>
            </div>
        </aside>
    );
};

export default RightSidebar;
