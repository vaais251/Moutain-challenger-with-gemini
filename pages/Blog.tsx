

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import type { BlogPost, BlogCategory } from '../types';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="group bg-brand-base rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
        <Link to={`/blog/${post.id}`}>
            <div className="relative">
                <img src={post.image} alt={post.title} className="h-64 w-full object-cover"/>
                <span className="absolute top-4 left-4 bg-brand-accent text-brand-dark px-3 py-1 text-xs font-bold rounded-full">{post.category}</span>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold font-heading text-white group-hover:text-brand-accent transition-colors">{post.title}</h2>
                <p className="text-sm text-brand-muted mt-2">{post.date} // By {post.author}</p>
                <p className="text-brand-light mt-4 h-24 overflow-hidden">{post.excerpt}</p>
                <span className="inline-block mt-4 font-semibold text-brand-accent">Read More →</span>
            </div>
        </Link>
    </div>
);

const Blog: React.FC = () => {
    const [filter, setFilter] = useState<BlogCategory | 'All'>('All');

    const filteredPosts = useMemo(() => {
        if (filter === 'All') return BLOG_POSTS;
        return BLOG_POSTS.filter(post => post.category === filter);
    }, [filter]);

    const categories: (BlogCategory | 'All')[] = ['All', 'Trekking Tips', 'Cultural Stories', 'Expedition Reports', 'Gear Reviews'];

    return (
        <div className="bg-brand-dark pt-16 min-h-screen">
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/blog-banner/1920/600')" }}>
                <div className="absolute inset-0 bg-hero-gradient flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-heading uppercase text-white">Tales from the Trail</h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl">Insights, stories, and advice from our team of mountain experts.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                 <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                                filter === category 
                                ? 'bg-brand-accent text-brand-dark' 
                                : 'bg-brand-base text-white hover:bg-brand-accent hover:text-brand-dark'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center col-span-full py-16">
                        <h2 className="text-2xl font-bold font-heading text-white">No Articles Found</h2>
                        <p className="mt-4 text-brand-muted">There are no articles in this category yet. Try another one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;