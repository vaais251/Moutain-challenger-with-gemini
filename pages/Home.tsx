
import React from 'react';
import { Link } from 'react-router-dom';
import { EXPEDITIONS, TESTIMONIALS, BLOG_POSTS } from '../constants';

const Hero = () => (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/k2-hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-brand-primary bg-opacity-60"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Conquer the Karakoram
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-brand-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Embark on a journey of a lifetime with Pakistan's most trusted high-altitude adventure specialists.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link
                    to="/expeditions"
                    className="transform rounded-md bg-brand-accent px-8 py-3 text-lg font-semibold text-brand-primary shadow-lg transition hover:-translate-y-1 hover:bg-yellow-400"
                >
                    Explore Expeditions
                </Link>
                <Link
                    to="/ai-planner"
                    className="transform rounded-md border-2 border-brand-accent px-8 py-3 text-lg font-semibold text-brand-accent shadow-lg transition hover:-translate-y-1 hover:bg-brand-accent hover:text-brand-primary"
                >
                    AI Trip Planner
                </Link>
            </div>
        </div>
    </div>
);

const ExpeditionCard: React.FC<{ expedition: typeof EXPEDITIONS[0] }> = ({ expedition }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-2xl animate-fade-in-up">
        <img src={expedition.image} alt={expedition.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold">{expedition.name}</h3>
            <p className="mt-2 text-sm text-brand-light">{expedition.shortDescription}</p>
            <div className="mt-4 flex items-center gap-4 text-sm font-medium">
                <span>{expedition.duration} Days</span>
                <span className="h-4 w-px bg-white/50"></span>
                <span>{expedition.difficulty}</span>
            </div>
            <Link to={`/expeditions/${expedition.id}`} className="mt-6 inline-block rounded-md bg-brand-accent px-5 py-2 text-sm font-semibold text-brand-primary transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                View Details
            </Link>
        </div>
    </div>
);

const WhyChooseUs = () => {
    const features = [
        { icon: '🛡️', title: 'Unrivaled Safety', description: 'Our certified guides and meticulous planning prioritize your well-being above all.' },
        { icon: '🏔️', title: 'Local Expertise', description: 'Born and raised in these mountains, our team offers authentic insights and unparalleled knowledge.' },
        { icon: '⭐', title: 'Bespoke Journeys', description: 'We tailor every trip to your skills and dreams, creating a truly personal adventure.' },
    ];
    return (
        <div className="py-24 bg-brand-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-white">Why Mountain Challenger?</h2>
                <p className="mt-4 text-center text-lg text-gray-400 max-w-3xl mx-auto">We are more than a tour company; we are your partners in adventure, committed to delivering an experience that is authentic, safe, and unforgettable.</p>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                         <div key={index} className="text-center p-6 bg-brand-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="text-5xl">{feature.icon}</div>
                            <h3 className="mt-4 text-2xl font-bold text-white">{feature.title}</h3>
                            <p className="mt-2 text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const UpcomingDepartures = () => {
    const departures = [
        { expedition: EXPEDITIONS[0], date: 'Aug 05, 2024' },
        { expedition: EXPEDITIONS[1], date: 'Aug 20, 2024' },
        { expedition: EXPEDITIONS[2], date: 'Sep 10, 2024' },
    ];
    return (
        <div className="py-24 bg-brand-primary">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-white">Upcoming Departures</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {departures.map((departure, index) => (
                        <div key={index} className="bg-brand-secondary rounded-lg shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                            <img src={departure.expedition.image} alt={departure.expedition.name} className="h-56 w-full object-cover"/>
                            <div className="p-6">
                                <p className="text-brand-accent font-semibold">{departure.date}</p>
                                <h3 className="text-xl font-bold text-white mt-2">{departure.expedition.name}</h3>
                                <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                                    <span>{departure.expedition.duration} Days</span>
                                    <span>{departure.expedition.difficulty}</span>
                                </div>
                                <Link to={`/expeditions/${departure.expedition.id}`} className="mt-6 inline-block w-full text-center rounded-md bg-brand-accent px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-yellow-400">
                                    Join This Trip
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const LatestBlogPosts = () => (
    <div className="py-24 bg-brand-secondary">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-white">From Our Blog</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {BLOG_POSTS.slice(0, 2).map((post, index) => (
                    <div key={post.id} className="group bg-brand-primary rounded-lg shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                        <Link to={`/blog/${post.id}`}>
                            <img src={post.image} alt={post.title} className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white group-hover:text-brand-accent">{post.title}</h3>
                                <p className="text-sm text-gray-400 mt-2">{post.date} by {post.author}</p>
                                <p className="text-gray-300 mt-4">{post.excerpt}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link
                    to="/blog"
                    className="transform rounded-md bg-brand-accent px-8 py-3 text-lg font-semibold text-brand-primary shadow-lg transition hover:-translate-y-1 hover:bg-yellow-400"
                >
                    Read More Articles
                </Link>
            </div>
        </div>
    </div>
);


const Testimonials = () => (
    <div className="py-24 bg-brand-primary">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-white">Hear From Our Challengers</h2>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial, index) => (
                    <div key={testimonial.id} className="bg-brand-secondary p-8 rounded-lg shadow-xl animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                        <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                        <div className="mt-6 flex items-center">
                            <img src={testimonial.image} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
                            <div className="ml-4">
                                <p className="font-bold text-white">{testimonial.name}</p>
                                <p className="text-sm text-brand-accent">{testimonial.country}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <section className="py-24 bg-brand-primary">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-white">Featured Expeditions</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {EXPEDITIONS.slice(0, 3).map((exp, index) => (
                             <div key={exp.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                <ExpeditionCard expedition={exp} />
                             </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                         <Link
                            to="/expeditions"
                            className="transform rounded-md bg-brand-accent px-8 py-3 text-lg font-semibold text-brand-primary shadow-lg transition hover:-translate-y-1 hover:bg-yellow-400"
                        >
                            View All Trips
                        </Link>
                    </div>
                </div>
            </section>
            <WhyChooseUs />
            <UpcomingDepartures />
            <Testimonials />
            <LatestBlogPosts />
        </div>
    );
};

export default Home;
