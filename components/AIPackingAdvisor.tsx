import React, { useState } from 'react';
import { EXPEDITIONS } from '../constants';
import { generatePackingList } from '../services/geminiService';
import type { PackingList, PackingListCategory } from '../types';
import Spinner from './Spinner';
import { getApiKey } from '../config';

const PackingListCategory: React.FC<{ category: PackingListCategory, isOpen: boolean, onClick: () => void }> = ({ category, isOpen, onClick }) => (
    <div className="border-b border-gray-700">
        <button
            className="flex justify-between items-center w-full py-4 text-left"
            onClick={onClick}
        >
            <span className="text-lg font-semibold text-white">{category.categoryName} ({category.items.length} items)</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-brand-accent"><path d="m6 9 6 6 6-6"></path></svg>
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-full' : 'max-h-0'}`}>
            <div className="pb-4 pr-4">
                <ul className="space-y-3 mt-2">
                    {category.items.map(item => (
                        <li key={item.itemName} className="grid grid-cols-3 gap-4 items-start">
                            <span className="col-span-1 font-medium text-brand-light">{item.itemName}</span>
                            <span className="col-span-2 text-brand-muted text-sm">
                                <span className="font-semibold text-brand-accent">Qty: {item.quantity}</span> - {item.notes}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const AIPackingAdvisor: React.FC = () => {
    const [expeditionId, setExpeditionId] = useState(EXPEDITIONS[0].id);
    const [season, setSeason] = useState('Summer (Jun-Aug)');
    const [preferences, setPreferences] = useState('');
    const [packingList, setPackingList] = useState<PackingList | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    
    const hasApiKey = !!getApiKey() || !!(window as any).aistudio;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setPackingList(null);
        setOpenCategory(null);
        try {
            const list = await generatePackingList(expeditionId, season, preferences);
            setPackingList(list);
            // Auto-open the first category
            if (list.packingList.length > 0) {
                setOpenCategory(list.packingList[0].categoryName);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to generate packing list.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleCategory = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    return (
        <div className="bg-brand-base p-8 rounded-lg shadow-xl mb-16">
            <h2 className="text-3xl font-bold font-heading text-white mb-6 text-center">AI-Powered Packing Advisor</h2>
            <p className="text-center text-brand-muted mb-8 max-w-2xl mx-auto">Get a personalized packing list for your specific expedition. Select your trip, season, and add any personal notes for a tailored recommendation.</p>
            
            {!hasApiKey ? (
                 <p className="text-center text-yellow-400 p-4 border border-yellow-400 rounded-md">Please configure your API key to use this feature.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="expedition" className="block text-sm font-medium text-brand-light">Select Expedition</label>
                            <select id="expedition" value={expeditionId} onChange={e => setExpeditionId(e.target.value)} className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent">
                                {EXPEDITIONS.map(exp => <option key={exp.id} value={exp.id}>{exp.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="season" className="block text-sm font-medium text-brand-light">Select Season</label>
                            <select id="season" value={season} onChange={e => setSeason(e.target.value)} className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent">
                                <option>Summer (Jun-Aug)</option>
                                <option>Spring (Apr-May)</option>
                                <option>Autumn (Sep-Oct)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="preferences" className="block text-sm font-medium text-brand-light">Personal Notes (Optional)</label>
                        <input type="text" id="preferences" value={preferences} onChange={e => setPreferences(e.target.value)} placeholder="e.g., I get cold easily, I'm a photographer..." className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center transform rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400 disabled:bg-gray-500">
                            {isLoading ? <Spinner /> : 'Get My Packing List'}
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-8 max-w-3xl mx-auto">
                {error && <p className="text-red-400 text-center">{error}</p>}
                {packingList && (
                    <div className="animate-fade-in-up">
                        <h3 className="text-2xl font-bold font-heading text-white mb-4">Your Custom Packing List:</h3>
                        {packingList.packingList.map(category => (
                            <PackingListCategory 
                                key={category.categoryName} 
                                category={category}
                                isOpen={openCategory === category.categoryName}
                                onClick={() => toggleCategory(category.categoryName)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIPackingAdvisor;