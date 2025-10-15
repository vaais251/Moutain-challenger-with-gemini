
import React, { useState } from 'react';
import { generateTripSuggestion } from '../services/geminiService';
import type { Difficulty } from '../types';
import Spinner from '../components/Spinner';

const AITripPlanner: React.FC = () => {
  const [duration, setDuration] = useState('14');
  const [fitness, setFitness] = useState<Difficulty>('Intermediate');
  const [interests, setInterests] = useState('epic views, culture, not too crowded');

  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestion('');
    setError('');

    try {
      const result = await generateTripSuggestion(duration, fitness, interests);
      setSuggestion(result);
    } catch (err) {
      setError("We're sorry, but we couldn't generate a recommendation at this time. Please check your connection or try again later.");
      console.error("AI Planner Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-primary min-h-screen pt-16 text-brand-light">
      <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/ai-banner/1920/600')" }}>
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">AI Trip Planner</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">Let our AI craft the perfect Karakoram adventure for you.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-brand-secondary p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-accent pl-4">Tell Us Your Preferences</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-brand-light mb-2">
                  Trip Duration (approx. {duration} days)
                </label>
                <input
                  type="range"
                  id="duration"
                  min="5"
                  max="30"
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
              </div>
              <div>
                <label htmlFor="fitness" className="block text-sm font-medium text-brand-light">Your Fitness Level</label>
                <select
                  id="fitness"
                  value={fitness}
                  onChange={(e) => setFitness(e.target.value as Difficulty)}
                  className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-brand-light">What are you interested in?</label>
                <textarea
                  id="interests"
                  rows={4}
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., famous peaks, remote valleys, local culture, photography, challenging passes..."
                  className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full transform rounded-md bg-brand-accent px-6 py-3 text-lg font-semibold text-brand-primary shadow-lg transition hover:-translate-y-1 hover:bg-yellow-400 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? <Spinner /> : 'Generate My Trip'}
                </button>
              </div>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-brand-secondary p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-accent pl-4">Your Personalized Suggestion</h2>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <Spinner />
                <p className="mt-4 text-gray-400">Our AI is planning your adventure...</p>
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 p-4 border border-red-400 rounded-md">
                {error}
              </div>
            )}
            {suggestion && !isLoading && (
              <div className="text-gray-300 whitespace-pre-wrap animate-fade-in-up">
                {suggestion}
              </div>
            )}
            {!isLoading && !suggestion && !error && (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center text-gray-400">
                    <p>Your dream trip awaits! Fill out the form on the left and let our AI guide find the perfect expedition for you.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITripPlanner;
