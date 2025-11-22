import React from 'react';
import Layout from '../components/layout/Layout';
import CreatePost from '../components/feed/CreatePost';
import PostCard from '../components/feed/PostCard';
import { Search } from 'lucide-react';

const Home = () => {
    // Dummy data matching the image
    const posts = [
        {
            id: 1,
            author: {
                name: 'Alex Rivera',
                avatar: 'https://i.pravatar.cc/150?u=alex',
            },
            createdAt: '2 hours ago',
            content: 'Just pushed a new feature to my project using Rust and WebAssembly. The performance gains are incredible! Check out the repo. #rustlang #wasm',
            codeSnippet: `// Rust + Wasm example
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}`,
            likes: 128,
            comments: 16,
            shares: 8,
        },
        {
            id: 2,
            author: {
                name: 'Sarah Chen',
                avatar: 'https://i.pravatar.cc/150?u=sarah',
            },
            createdAt: '5 hours ago',
            content: 'Working on a new design system for our enterprise app. Loving the flexibility of Tailwind CSS! 🎨✨',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
            likes: 245,
            comments: 42,
            shares: 12,
        }
    ];

    return (
        <Layout>
            <div className="p-4 md:p-6 max-w-2xl mx-auto">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold text-white">DevConnects</h1>
                    <button className="p-2 bg-surface rounded-full">
                        <Search size={20} />
                    </button>
                </div>

                <CreatePost />

                <div className="space-y-4">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
