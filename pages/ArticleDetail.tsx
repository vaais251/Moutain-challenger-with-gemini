
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, GUIDES } from '../constants';
import type { BlogPost } from '../types';

const RelatedArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="group bg-brand-primary rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105">
        <Link to={`/blog/${post.id}`}>
            <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
            <div className="p-4">
                <h3 className="text-md font-bold text-white group-hover:text-brand-accent transition-colors">{post.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{post.date}</p>
            </div>
        </Link>
    </div>
);


const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        return (
            <div className="flex items-center justify-center h-screen bg-brand-primary text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Article Not Found</h1>
                    <p className="mt-4">This story seems to have wandered off the trail.</p>
                    <Link to="/blog" className="mt-8 inline-block rounded-md bg-brand-accent px-6 py-3 font-semibold text-brand-primary">Back to Blog</Link>
                </div>
            </div>
        );
    }

    const authorDetails = GUIDES.find(guide => guide.name === post.author);
    const relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);

    return (
        <div className="bg-brand-primary pt-16 text-brand-light">
            <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white p-4 max-w-4xl">
                        <span className="bg-brand-accent text-brand-primary px-3 py-1 text-sm font-bold rounded-full">{post.category}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4">{post.title}</h1>
                        <p className="mt-4 text-lg text-gray-300">{post.date} // By {post.author}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="bg-brand-secondary p-8 md:p-12 rounded-lg shadow-xl">
                            <div 
                                className="prose prose-lg prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            {authorDetails && (
                                <div className="bg-brand-secondary p-6 rounded-lg shadow-xl text-center">
                                    <img src={authorDetails.image} alt={authorDetails.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-brand-accent" />
                                    <h3 className="text-xl font-bold text-white mt-4">About the Author</h3>
                                    <p className="text-lg text-brand-accent font-semibold">{authorDetails.name}</p>
                                    <p className="text-sm text-gray-400 mt-2">{authorDetails.bio}</p>
                                </div>
                            )}

                            {relatedPosts.length > 0 && (
                                <div className="bg-brand-secondary p-6 rounded-lg shadow-xl">
                                    <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-brand-accent pl-3">Related Articles</h3>
                                    <div className="space-y-4">
                                        {relatedPosts.map(p => <RelatedArticleCard key={p.id} post={p} />)}
                                    </div>
                                </div>
                            )}

                             <div className="bg-brand-secondary p-6 rounded-lg shadow-xl text-center">
                                 <Link to="/blog" className="font-semibold text-brand-accent hover:underline">
                                    ← Back to All Articles
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
