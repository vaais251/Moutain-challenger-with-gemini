import React, { useState, useEffect } from 'react';
import { generateEnhancedTripPlan, ImageDetail, MapData } from '../services/geminiService';
import { getApiKey } from '../config';
import type { Difficulty, MapMarker, AlternativeTrip } from '../types';
import Spinner from '../components/Spinner';
import EnquiryModal from '../components/EnquiryModal';
import MapComponent from '../components/MapComponent';

const ApiKeyPrompt: React.FC<{ onSelectKey: () => void }> = ({ onSelectKey }) => {
    const isStudioEnvironment = !!(window as any).aistudio;

    return (
        <div className="bg-brand-base p-8 rounded-lg shadow-xl border border-brand-accent mb-12 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white text-center font-heading">API Key Required</h2>
            {isStudioEnvironment ? (
                <>
                    <p className="mt-4 text-center text-brand-light">
                        To use the AI-powered trip planner, you need to select a Google AI Studio API key.
                        This allows the application to communicate securely with Google's generative models.
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
                    To use the AI-powered trip planner on your local server, please add your Google AI Studio API key to the <code className="bg-brand-dark px-1 py-0.5 rounded text-brand-accent">config.ts</code> file.
                </p>
            )}
            <p className="mt-4 text-center text-sm text-brand-muted">
                For more information on setting up your key, please visit the{' '}
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-accent underline hover:text-lime-400">
                    official documentation
                </a>.
            </p>
        </div>
    );
};

const AITripPlanner: React.FC = () => {
  const [duration, setDuration] = useState('14');
  const [fitness, setFitness] = useState<Difficulty>('Intermediate');
  const [interests, setInterests] = useState('epic views, culture, not too crowded');

  // State for results and loading
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [images, setImages] = useState<ImageDetail[]>([]);
  const [mapData, setMapData] = useState<{ center: { lat: number, lng: number }, zoom: number, markers: MapMarker[] } | null>(null);
  const [alternatives, setAlternatives] = useState<AlternativeTrip[]>([]);
  const [error, setError] = useState('');
  
  // More granular loading states for UX
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingMap, setIsGeneratingMap] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isGeneratingAlternatives, setIsGeneratingAlternatives] = useState(false);

  const [hasApiKey, setHasApiKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedTripName, setRecommendedTripName] = useState('');

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
    const timer = setTimeout(checkApiKeyAvailability, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectKey = async () => {
    try {
        if ((window as any).aistudio) {
            await (window as any).aistudio.openSelectKey();
            const keyAvailable = await checkApiKeyAvailability();
            if (keyAvailable) setError('');
        }
    } catch (e) {
        console.error("API key selection failed:", e);
        setError("Could not open the API key selection dialog. Please try again.");
    }
  };

  const resetResults = () => {
      setSuggestion('');
      setError('');
      setImages([]);
      setMapData(null);
      setAlternatives([]);
      setRecommendedTripName('');
  };

  const getTripName = (text: string): string => {
    if (!text) return 'Custom AI-Generated Trip';
    const firstLine = text.split('\n').find(line => line.trim() !== '');
    if (!firstLine) return 'Custom AI-Generated Trip';
    return firstLine.replace(/^(#+\s*)|(\*{1,2})/g, '').replace(/(\*{1,2})$/g, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetResults();
    setIsLoading(true);
    setIsGeneratingText(true);
    setIsGeneratingMap(true);
    setIsGeneratingImages(true);
    setIsGeneratingAlternatives(true);

    const keyAvailable = await checkApiKeyAvailability();
    if (!keyAvailable) {
        setError("API key not found. Please select a key or add it to your config.ts file.");
        setIsLoading(false);
        setIsGeneratingText(false);
        setIsGeneratingMap(false);
        setIsGeneratingImages(false);
        setIsGeneratingAlternatives(false);
        return;
    }

    try {
      const stream = generateEnhancedTripPlan(duration, fitness, interests);
      for await (const result of stream) {
        switch (result.type) {
          case 'text':
            setSuggestion(result.data);
            setRecommendedTripName(getTripName(result.data));
            setIsGeneratingText(false);
            break;
          case 'alternatives':
            setAlternatives(result.data);
            setIsGeneratingAlternatives(false);
            break;
          case 'map':
            const typedData = result.data as MapData;
            const formattedMarkers: MapMarker[] = typedData.markers.map(m => ({
                coords: { lat: m.lat, lng: m.lng },
                popupText: `<b>${m.name}</b>`
            }));
            setMapData({
                center: typedData.center,
                zoom: typedData.zoom,
                markers: formattedMarkers
            });
            setIsGeneratingMap(false);
            break;
          case 'images':
            setImages(result.data);
            setIsGeneratingImages(false);
            break;
          case 'error':
             throw new Error(result.data);
        }
      }
    } catch (err: any) {
        const errorMessage = (err.message || 'An unknown error occurred').toLowerCase();
        if (errorMessage.includes("api key")) {
            setError("Your API key seems invalid or is missing permissions. Please select a valid key.");
            setHasApiKey(false);
        } else {
            setError("Sorry, we couldn't generate a recommendation. Please try again later.");
        }
        console.error("AI Planner Error:", err);
    } finally {
      setIsLoading(false);
      setIsGeneratingText(false);
      setIsGeneratingMap(false);
      setIsGeneratingImages(false);
      setIsGeneratingAlternatives(false);
    }
  };
  
  const isFormDisabled = isLoading || !hasApiKey;

  const formatSuggestionText = (text: string) => {
    return text
      .replace(/^(### |## |# )/gm, '')
      .replace(/^\* /gm, '• ')
      .replace(/^- /gm, '• ')
      .replace(/\*\*(.*?)\*\*/g, '$1');
  };
  
  const ImageLoadingPlaceholder = () => (
    <div className="aspect-video bg-brand-dark rounded-lg flex flex-col items-center justify-center text-center text-brand-muted border border-gray-700">
        <Spinner />
        <p className="mt-2 text-sm">Generating virtual postcard...</p>
    </div>
  );

  return (
    <>
    <div className="bg-brand-dark min-h-screen pt-16 text-brand-light">
      <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/ai-banner/1920/600')" }}>
        <div className="absolute inset-0 bg-hero-gradient flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-6xl font-extrabold font-heading uppercase text-white">AI Trip Planner</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">Let our AI craft the perfect Karakoram adventure for you.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {!hasApiKey && <ApiKeyPrompt onSelectKey={handleSelectKey} />}

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className={`bg-brand-base p-8 rounded-lg shadow-xl transition-opacity ${!hasApiKey ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-3xl font-bold font-heading text-white mb-6 border-l-4 border-brand-accent pl-4">Tell Us Your Preferences</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields... */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-brand-light mb-2">Trip Duration (approx. {duration} days)</label>
                <input type="range" id="duration" min="5" max="30" step="1" value={duration} onChange={(e) => setDuration(e.target.value)} disabled={isFormDisabled} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-accent disabled:opacity-50" />
              </div>
              <div>
                <label htmlFor="fitness" className="block text-sm font-medium text-brand-light">Your Fitness Level</label>
                <select id="fitness" value={fitness} onChange={(e) => setFitness(e.target.value as Difficulty)} disabled={isFormDisabled} className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent disabled:opacity-50">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-brand-light">What are you interested in?</label>
                <textarea id="interests" rows={4} value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., famous peaks, remote valleys, local culture, photography..." disabled={isFormDisabled} className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent disabled:opacity-50" />
              </div>
              <div>
                <button type="submit" disabled={isFormDisabled} className="w-full transform rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center">
                  {isLoading ? <Spinner /> : 'Generate My Trip'}
                </button>
              </div>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-brand-base p-8 rounded-lg shadow-xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold font-heading text-white mb-4 border-l-4 border-brand-accent pl-4">Your Personalized Suggestion</h2>
                {isGeneratingText && <div className="flex items-center text-brand-muted"><Spinner /> <span className="ml-2">Planning your trip...</span></div>}
                {suggestion && (
                    <div className="text-brand-light whitespace-pre-wrap animate-fade-in-up">{formatSuggestionText(suggestion)}</div>
                )}
            </div>
            
            {(isGeneratingImages || images.length > 0) && (
                 <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold font-heading text-brand-light mb-3">Virtual Postcards</h3>
                    <div className="grid grid-cols-1 gap-6">
                        {isGeneratingImages ? (
                            Array.from({ length: 2 }).map((_, i) => <ImageLoadingPlaceholder key={i} />)
                        ) : (
                            images.map((img, i) => (
                                <div key={i} className="animate-fade-in-up">
                                    <img src={img.url} alt={img.title} className="aspect-video w-full object-cover rounded-t-lg shadow-md" />
                                    <div className="bg-brand-dark p-3 rounded-b-lg">
                                        <h4 className="font-bold text-white">{img.title}</h4>
                                        <p className="text-sm text-brand-muted">{img.description}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {(isGeneratingMap || mapData) && (
                <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold font-heading text-brand-light mb-3">Suggested Route</h3>
                    {isGeneratingMap ? (
                        <div className="aspect-[16/10] bg-brand-dark rounded-lg animate-pulse"></div>
                    ) : mapData && (
                        <div className="animate-fade-in-up">
                            <MapComponent
                                center={mapData.center}
                                zoom={mapData.zoom}
                                markers={mapData.markers}
                            />
                        </div>
                    )}
                </div>
            )}
            
            {suggestion && !isLoading && (
                 <div className="border-t border-gray-700 pt-6">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full transform rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400"
                    >
                      Enquire About This Trip
                    </button>
                </div>
            )}

            {(isGeneratingAlternatives || alternatives.length > 0) && (
                <div className="border-t border-gray-700 pt-6 animate-fade-in-up">
                    <h3 className="text-xl font-semibold font-heading text-brand-light mb-3">You Might Also Like...</h3>
                    {isGeneratingAlternatives ? (
                        <div className="flex items-center text-brand-muted"><Spinner /> <span className="ml-2">Finding other options...</span></div>
                    ) : (
                        <div className="space-y-4">
                            {alternatives.map((alt, index) => (
                                <div key={index} className="bg-brand-dark p-4 rounded-lg">
                                    <h4 className="font-bold text-brand-accent">{alt.title}</h4>
                                    <p className="text-sm text-brand-muted mt-1">{alt.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {error && <div className="text-center text-red-400 p-4 border border-red-400 rounded-md">{error}</div>}
            
            {!isLoading && !suggestion && !error && (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center text-brand-muted">
                    <p>Your dream trip awaits! Fill out the form to generate a complete visual itinerary.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        expeditionName={recommendedTripName}
    />
    </>
  );
};

export default AITripPlanner;