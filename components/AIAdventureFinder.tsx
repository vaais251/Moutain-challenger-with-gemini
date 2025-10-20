import React, { useState } from 'react';
import { generateAdventureBlurb } from '../services/geminiService';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { getApiKey } from '../config';

const AIAdventureFinder: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');

    const interests = [
        { key: 'Legendary Peaks', icon: '🏔️' },
        { key: 'Cultural Immersion', icon: '🏘️' },
        { key: 'Hidden Valleys', icon: '🌲' },
    ];
    
    const handleInterestClick = async (interest: string) => {
        if (!getApiKey() && !(window as any).aistudio) {
            setError('Please configure your API key to use this feature.');
            return;
        }

        setSelectedInterest(interest);
        setIsLoading(true);
        setAiResponse('');
        setError('');

        try {
            const response = await generateAdventureBlurb(interest);
            setAiResponse(response);
        } catch (e: any) {
            setError(e.message || 'Could not get a response from the AI.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-24 bg-brand-base">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold font-heading uppercase text-white">Find Your Perfect Adventure</h2>
                <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">
                    Not sure where to start? Select an interest below and let our AI guide inspire your next journey.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    {interests.map(interest => (
                        <button
                            key={interest.key}
                            onClick={() => handleInterestClick(interest.key)}
                            disabled={isLoading}
                            className={`flex items-center gap-3 rounded-lg px-6 py-3 text-lg font-bold shadow-lg transition transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 ${
                                selectedInterest === interest.key && !isLoading
                                ? 'bg-lime-300 text-brand-dark' 
                                : 'bg-brand-accent text-brand-dark'
                            }`}
                        >
                            <span className="text-2xl">{interest.icon}</span>
                            <span>{interest.key}</span>
                        </button>
                    ))}
                </div>
                
                <div className="mt-10 min-h-[150px] max-w-3xl mx-auto">
                    {isLoading && <Spinner />}
                    {error && <p className="text-red-400">{error}</p>}
                    {aiResponse && (
                        <div className="bg-brand-dark p-6 rounded-lg shadow-inner animate-fade-in-up">
                            <p className="text-brand-light text-lg italic">{aiResponse}</p>
                            <Link 
                                to="/expeditions" 
                                className="mt-6 inline-block transform rounded-md bg-white px-6 py-2 text-md font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-gray-200"
                            >
                                Find Your Trip
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAdventureFinder;