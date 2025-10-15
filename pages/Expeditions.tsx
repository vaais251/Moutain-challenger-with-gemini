
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EXPEDITIONS } from '../constants';
import type { Difficulty, Expedition } from '../types';

const ExpeditionCard: React.FC<{ expedition: Expedition }> = ({ expedition }) => (
    <div className="group overflow-hidden rounded-lg bg-brand-secondary shadow-lg transition-transform duration-300 hover:-translate-y-2">
        <Link to={`/expeditions/${expedition.id}`}>
            <div className="relative">
                <img src={expedition.image} alt={expedition.name} className="h-64 w-full object-cover" />
                <div className="absolute top-4 right-4 bg-brand-accent text-brand-primary px-3 py-1 text-sm font-bold rounded-full">
                    {expedition.difficulty}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">{expedition.name}</h3>
                <p className="mt-2 text-gray-400 h-16">{expedition.shortDescription}</p>
                <div className="mt-4 border-t border-gray-700 pt-4 flex justify-between items-center text-brand-light">
                    <span className="font-semibold">{expedition.duration} Days</span>
                    <span className="text-sm">{expedition.bestSeason}</span>
                </div>
            </div>
        </Link>
    </div>
);


const Expeditions: React.FC = () => {
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
    const [durationFilter, setDurationFilter] = useState<number>(30);

    const filteredExpeditions = useMemo(() => {
        return EXPEDITIONS.filter(exp => {
            const difficultyMatch = difficultyFilter === 'All' || exp.difficulty === difficultyFilter;
            const durationMatch = exp.duration <= durationFilter;
            return difficultyMatch && durationMatch;
        });
    }, [difficultyFilter, durationFilter]);

    return (
        <div className="bg-brand-primary min-h-screen pt-24">
             <div className="bg-cover bg-center h-64" style={{ backgroundImage: "url('https://picsum.photos/seed/expedition-banner/1920/500')" }}>
                <div className="bg-black/60 h-full flex items-center justify-center">
                    <h1 className="text-5xl font-extrabold text-white tracking-wider">Our Expeditions</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Filters */}
                <div className="mb-12 p-6 bg-brand-secondary rounded-lg shadow-md flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div className="flex flex-col items-center md:items-start">
                        <label htmlFor="difficulty" className="mb-2 font-semibold text-white">Difficulty</label>
                        <select
                            id="difficulty"
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'All')}
                            className="bg-brand-primary border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-brand-accent focus:border-brand-accent"
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-center md:items-start w-full md:w-64">
                        <label htmlFor="duration" className="mb-2 font-semibold text-white">Max Duration ({durationFilter} days)</label>
                        <input
                            type="range"
                            id="duration"
                            min="5"
                            max="30"
                            step="1"
                            value={durationFilter}
                            onChange={(e) => setDurationFilter(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                        />
                    </div>
                </div>

                {/* Expedition Grid */}
                {filteredExpeditions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredExpeditions.map(exp => (
                            <ExpeditionCard key={exp.id} expedition={exp} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-white">No Expeditions Found</h2>
                        <p className="mt-4 text-gray-400">Try adjusting your filters to find your perfect adventure.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expeditions;
