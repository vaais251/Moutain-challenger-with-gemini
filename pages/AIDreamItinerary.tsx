import React, { useState, useEffect } from 'react';
import { generateDreamItinerary } from '../services/geminiService';
import { getApiKey } from '../config';
import Spinner from '../components/Spinner';

const ApiKeyPrompt: React.FC<{ onSelectKey: () => void }> = ({ onSelectKey }) => {
    const isStudioEnvironment = !!(window as any).aistudio;
    return (
        <div className="bg-brand-base p-8 rounded-lg shadow-xl border border-brand-accent mb-12 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white text-center font-heading">API Key Required</h2>
            {isStudioEnvironment ? (
                <>
                    <p className="mt-4 text-center text-brand-light">
                        To use the AI Dream Visualizer, you need to select a Google AI Studio API key.
                    </p>
                    <div className="mt-6 text-center">
                        <button
                            onClick={onSelectKey}
                            className="transform rounded-md bg-brand-accent px-8 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400"
                        >
                            Select Your API Key
                        </button>
                    </div>
                </>
            ) : (
                <p className="mt-4 text-center text-brand-light">
                    To use this feature locally, please add your Google AI Studio API key to the <code className="bg-brand-dark px-1 py-0.5 rounded text-brand-accent">config.ts</code> file.
                </p>
            )}
        </div>
    );
};

const AIDreamItinerary: React.FC = () => {
    const [dream, setDream] = useState('A peaceful trek through green valleys with ancient forts and friendly villages.');
    const [isLoading, setIsLoading] = useState(false);
    const [itinerary, setItinerary] = useState('');
    const [image, setImage] = useState({ url: '', title: '' });
    const [error, setError] = useState('');
    const [hasApiKey, setHasApiKey] = useState(false);

    const checkApiKeyAvailability = async () => {
        const key = getApiKey();
        const isStudioKeyAvailable = (window as any).aistudio && await (window as any).aistudio.hasSelectedApiKey();
        if (key || isStudioKeyAvailable) {
            setHasApiKey(true);
            return true;
        }
        setHasApiKey(false);
        return false;
    };

    useEffect(() => {
        checkApiKeyAvailability();
    }, []);

    const handleSelectKey = async () => {
        if ((window as any).aistudio) {
            await (window as any).aistudio.openSelectKey();
            await checkApiKeyAvailability();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setItinerary('');
        setImage({ url: '', title: '' });
        setError('');
        setIsLoading(true);

        const keyAvailable = await checkApiKeyAvailability();
        if (!keyAvailable) {
            setError("API key not found. Please select a key or configure one.");
            setIsLoading(false);
            return;
        }

        try {
            const stream = generateDreamItinerary(dream);
            for await (const result of stream) {
                if (result.type === 'text') {
                    setItinerary(result.data);
                } else if (result.type === 'image') {
                    setImage(result.data);
                } else if (result.type === 'error') {
                    throw new Error(result.data);
                }
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatItineraryText = (text: string) => {
        const lines = text.split('\n');
        return (
            <>
                <h3 className="text-2xl font-bold font-heading text-brand-accent mb-4">{lines[0]}</h3>
                {lines.slice(1).map((line, index) => {
                    if (line.trim().startsWith('Day')) {
                        return <p key={index} className="font-semibold text-white mt-4">{line}</p>;
                    }
                    return <p key={index} className="text-brand-muted">{line}</p>;
                })}
            </>
        );
    };

    return (
        <div className="bg-brand-dark min-h-screen pt-16 text-brand-light">
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/dream-banner/1920/600')" }}>
                <div className="absolute inset-0 bg-hero-gradient flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-heading uppercase text-white">AI Dream Visualizer</h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl">Describe your perfect adventure, and let our AI bring it to life with an itinerary and a unique "movie poster".</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                {!hasApiKey && <ApiKeyPrompt onSelectKey={handleSelectKey} />}

                <div className={`max-w-3xl mx-auto bg-brand-base p-8 rounded-lg shadow-xl transition-opacity ${!hasApiKey ? 'opacity-50 pointer-events-none' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="dream-description" className="block text-lg font-semibold text-white mb-2">Describe Your Dream Adventure:</label>
                        <textarea
                            id="dream-description"
                            rows={3}
                            value={dream}
                            onChange={e => setDream(e.target.value)}
                            className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="e.g., I want to see giant, icy peaks and ancient forts..."
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="mt-4 w-full flex justify-center items-center transform rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400 disabled:bg-gray-500">
                            {isLoading ? <Spinner /> : 'Visualize My Dream'}
                        </button>
                    </form>
                </div>

                {error && <p className="text-red-400 text-center mt-8">{error}</p>}

                {(isLoading || itinerary || image.url) && (
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Itinerary */}
                        <div className="lg:col-span-3 bg-brand-base p-8 rounded-lg shadow-xl">
                            <h2 className="text-3xl font-bold font-heading text-white mb-4 border-l-4 border-brand-accent pl-4">Your Dream Itinerary</h2>
                            {isLoading && !itinerary ? (
                                <p className="text-brand-muted">Crafting your personal journey...</p>
                            ) : (
                                <div className="animate-fade-in-up space-y-2">{formatItineraryText(itinerary)}</div>
                            )}
                        </div>

                        {/* Image Poster */}
                        <div className="lg:col-span-2 bg-brand-base p-6 rounded-lg shadow-xl">
                            <h2 className="text-2xl font-bold font-heading text-white mb-4 text-center">Your Adventure Poster</h2>
                             {isLoading && !image.url ? (
                                <div className="aspect-[3/4] bg-brand-dark rounded-lg flex flex-col items-center justify-center text-center text-brand-muted border border-gray-700">
                                    <Spinner />
                                    <p className="mt-2 text-sm">Generating your visual...</p>
                                </div>
                             ) : image.url && (
                                <div className="animate-fade-in-up">
                                    <img src={image.url} alt={image.title} className="w-full h-auto rounded-lg shadow-md" />
                                    <p className="text-center text-sm text-brand-muted mt-2 italic">"{image.title}"</p>
                                </div>
                             )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIDreamItinerary;