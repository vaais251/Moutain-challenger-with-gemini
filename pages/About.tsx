
import React from 'react';
import { GUIDES } from '../constants';
import type { Guide } from '../types';

const GuideProfile: React.FC<{ guide: Guide }> = ({ guide }) => (
    <div className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden text-center">
        <img src={guide.image} alt={guide.name} className="w-full h-80 object-cover" />
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white">{guide.name}</h3>
            <p className="text-brand-accent font-semibold mt-1">{guide.role}</p>
            <p className="text-gray-400 mt-4 text-sm">{guide.bio}</p>
        </div>
    </div>
);


const About: React.FC = () => {
    return (
        <div className="bg-brand-primary pt-16 text-brand-light">
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/team-banner/1920/600')" }}>
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white">Our Story</h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl">Forged in the shadows of giants, driven by a passion for the world's greatest mountains.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-white border-l-4 border-brand-accent pl-4 mb-6">The Spirit of the Challenge</h2>
                        <p className="text-lg leading-relaxed text-gray-300 mb-4">
                            Mountain Challenger was founded by a team of local mountaineers from Gilgit-Baltistan who shared a single vision: to share the raw, untamed beauty of their homeland with the world, while upholding the highest standards of safety, professionalism, and respect for the environment.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-300">
                            We believe that trekking in the Karakoram is more than just a physical challenge; it's a spiritual journey. It's about disconnecting from the noise and reconnecting with nature, with yourself, and with the resilient communities that call these mountains home.
                        </p>
                    </div>
                    <div>
                        <img src="https://picsum.photos/seed/about-us-img/800/600" alt="Mountain guides planning a route" className="rounded-lg shadow-2xl" />
                    </div>
                </div>
            </div>

            <div className="bg-brand-secondary py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-white mb-16">Meet Our Expert Guides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {GUIDES.map(guide => (
                            <GuideProfile key={guide.id} guide={guide} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
