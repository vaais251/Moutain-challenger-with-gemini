

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EXPEDITIONS } from '../constants';
import type { Difficulty, Expedition, MapMarker } from '../types';
import { getAiSortedExpeditions } from '../services/geminiService';
import Spinner from '../components/Spinner';
import FeaturedExpedition from '../components/FeaturedExpedition';
import MapComponent from '../components/MapComponent';

const ExpeditionCard: React.FC<{ expedition: Expedition }> = ({ expedition }) => (
    <div className="group overflow-hidden rounded-lg bg-brand-base shadow-lg transition-transform duration-300 hover:-translate-y-2">
        <Link to={`/expeditions/${expedition.id}`}>
            <div className="relative">
                <img src={expedition.image} alt={expedition.name} className="h-64 w-full object-cover" />
                <div className="absolute top-4 right-4 bg-brand-accent text-brand-dark px-3 py-1 text-sm font-bold rounded-full">
                    {expedition.difficulty}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-brand-accent transition-colors">{expedition.name}</h3>
                <p className="mt-2 text-brand-muted h-16">{expedition.shortDescription}</p>
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
    const [sortBy, setSortBy] = useState('default');

    const [aiQuery, setAiQuery] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiSortedIds, setAiSortedIds] = useState<string[] | null>(null);
    const [aiError, setAiError] = useState('');


    const handleAiSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiQuery.trim()) return;

        setIsAiLoading(true);
        setAiError('');
        try {
            const sortedIds = await getAiSortedExpeditions(aiQuery);
            setAiSortedIds(sortedIds);
        } catch (error) {
            setAiError('Sorry, the AI matchmaker is currently unavailable. Please use the filters.');
            console.error(error);
        } finally {
            setIsAiLoading(false);
        }
    };
    
    const processedExpeditions = useMemo(() => {
        // 1. Start with the full list and apply manual filters
        let filtered = EXPEDITIONS.filter(exp => {
            const difficultyMatch = difficultyFilter === 'All' || exp.difficulty === difficultyFilter;
            const durationMatch = exp.duration <= durationFilter;
            return difficultyMatch && durationMatch;
        });
    
        // 2. Apply sorting. AI sort takes precedence over manual sort.
        if (aiSortedIds) {
            const sortOrder = aiSortedIds.reduce((acc, id, index) => {
                acc[id] = index;
                return acc;
            }, {} as Record<string, number>);
    
            filtered.sort((a, b) => {
                const aOrder = sortOrder[a.id] ?? Infinity;
                const bOrder = sortOrder[b.id] ?? Infinity;
                return aOrder - bOrder;
            });
        } else {
            const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
            switch (sortBy) {
                case 'duration-asc':
                    filtered.sort((a, b) => a.duration - b.duration);
                    break;
                case 'duration-desc':
                    filtered.sort((a, b) => b.duration - a.duration);
                    break;
                case 'difficulty-asc':
                    filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
                    break;
                case 'difficulty-desc':
                    filtered.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
                    break;
                default:
                    // 'default' sort, do nothing to maintain original order
                    break;
            }
        }
    
        return filtered;
    }, [difficultyFilter, durationFilter, aiSortedIds, sortBy]);

    const overviewMapMarkers = useMemo((): MapMarker[] => {
        return EXPEDITIONS.map(exp => ({
            coords: exp.itinerary[0]?.coordinates || exp.mapCenter, // Fallback to mapCenter
            popupText: `<b>${exp.name}</b><br/><a href="#/expeditions/${exp.id}" style="color: #a3e635; text-decoration: underline;">View Details</a>`
        }));
    }, []);

    const featuredExpedition = EXPEDITIONS.find(e => e.id === 'k2-base-camp-gondogoro-la');

    return (
        <div className="bg-brand-dark min-h-screen pt-16">
             <div className="bg-cover bg-center h-64" style={{ backgroundImage: "url('https://picsum.photos/seed/expedition-banner/1920/500')" }}>
                <div className="bg-hero-gradient h-full flex items-center justify-center">
                    <h1 className="font-heading text-5xl font-extrabold text-white uppercase tracking-wider">Our Expeditions</h1>
                </div>
            </div>

            {featuredExpedition && <FeaturedExpedition expedition={featuredExpedition} />}

            <div className="container mx-auto px-4 py-16">
                 {/* Expedition Overview Map */}
                 <div className="mb-16">
                    <h2 className="font-heading text-3xl font-bold text-white mb-6 border-l-4 border-brand-accent pl-4">Expedition Overview Map</h2>
                    <p className="mb-6 text-brand-muted max-w-3xl">Get a bird's-eye view of our adventures across the majestic Karakoram range. Click a marker to learn more about each expedition.</p>
                    <MapComponent 
                        center={{ lat: 35.8, lng: 75.5 }} // A central point for Gilgit-Baltistan
                        zoom={7}
                        markers={overviewMapMarkers}
                    />
                </div>

                {/* Filters */}
                <div className="mb-12 p-6 bg-brand-base rounded-lg shadow-md space-y-8">
                    {/* Standard Filters */}
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                        <div className="flex flex-col items-center md:items-start">
                            <label htmlFor="difficulty" className="mb-2 font-semibold text-white">Difficulty</label>
                            <select
                                id="difficulty"
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'All')}
                                className="bg-brand-dark border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-brand-accent focus:border-brand-accent"
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

                        <div className="flex flex-col items-center md:items-start">
                            <label htmlFor="sort" className="mb-2 font-semibold text-white">Sort By</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                disabled={!!aiSortedIds}
                                className="bg-brand-dark border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-brand-accent focus:border-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="default">Default</option>
                                <option value="duration-asc">Duration (Shortest)</option>
                                <option value="duration-desc">Duration (Longest)</option>
                                <option value="difficulty-asc">Difficulty (Easiest)</option>
                                <option value="difficulty-desc">Difficulty (Hardest)</option>
                            </select>
                        </div>
                    </div>
                    {/* AI Matchmaker */}
                    <div className="border-t border-gray-700 pt-8">
                         <h3 className="text-xl font-bold text-center text-white mb-4">
                            ✨ AI Expedition Matchmaker ✨
                         </h3>
                         <form onSubmit={handleAiSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
                            <input 
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="e.g., 'a short, easy cultural trip for a beginner'"
                                className="flex-grow bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"
                            />
                            <button type="submit" disabled={isAiLoading} className="flex items-center justify-center transform rounded-md bg-brand-accent px-6 py-2 text-md font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400 disabled:bg-gray-500 disabled:cursor-not-allowed">
                                {isAiLoading ? <Spinner /> : 'Find Match'}
                            </button>
                         </form>
                         {aiError && <p className="text-red-400 text-center mt-4">{aiError}</p>}
                    </div>
                </div>

                {/* Expedition Grid */}
                {aiSortedIds && (
                    <div className="text-center mb-8 bg-brand-base/50 border border-brand-accent text-brand-accent p-4 rounded-lg">
                        <p>Showing best AI-powered matches for your query. Manual sorting is disabled.</p>
                    </div>
                )}
                {processedExpeditions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processedExpeditions.map(exp => (
                            <ExpeditionCard key={exp.id} expedition={exp} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="font-heading text-2xl font-bold text-white">No Expeditions Found</h2>
                        <p className="mt-4 text-brand-muted">Try adjusting your filters to find your perfect adventure.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expeditions;