

import React from 'react';
import { Link } from 'react-router-dom';
import type { Expedition } from '../types';

interface FeaturedExpeditionProps {
  expedition: Expedition;
}

const FeaturedExpedition: React.FC<FeaturedExpeditionProps> = ({ expedition }) => {
  return (
    <div className="bg-brand-base">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <img 
              src={expedition.gallery[1] || expedition.image} 
              alt={expedition.name} 
              className="rounded-lg shadow-2xl object-cover w-full h-96" 
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Trip of the Month</h3>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-white mt-4">{expedition.name}</h2>
            <p className="mt-6 text-lg text-brand-light leading-relaxed">
              {/* Show first two sentences of the long description */}
              {expedition.longDescription.split('. ').slice(0, 2).join('. ')}.
            </p>
            <div className="mt-8 flex items-center gap-6 font-semibold text-white">
                <span>{expedition.duration} Days</span>
                <span className="h-5 w-px bg-white/30"></span>
                <span>{expedition.difficulty}</span>
                <span className="h-5 w-px bg-white/30"></span>
                <span>{expedition.bestSeason}</span>
            </div>
            <Link 
              to={`/expeditions/${expedition.id}`} 
              className="mt-10 inline-block transform rounded-md bg-brand-accent px-8 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400"
            >
              Discover This Journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedExpedition;