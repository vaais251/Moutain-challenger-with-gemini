import React, { useState } from 'react';
import { askExpertGuide } from '../services/geminiService';
import Spinner from './Spinner';
import { getApiKey } from '../config';

const AIAskAGuide: React.FC = () => {
    const [question, setQuestion] = useState("What's the best way to physically train for the Nanga Parbat trek if I live in a flat area?");
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const hasApiKey = !!getApiKey() || !!(window as any).aistudio;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsLoading(true);
        setError('');
        setAnswer('');
        try {
            const response = await askExpertGuide(question);
            setAnswer(response);
        } catch (err: any) {
            setError(err.message || 'Failed to get a response.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to format the AI's response text
    const formatAnswerText = (text: string) => {
        return text.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('* ')) {
                return <li key={index} className="ml-5 list-disc">{paragraph.substring(2)}</li>;
            }
            if (paragraph.trim() === '') {
                 return <br key={index} />;
            }
            return <p key={index}>{paragraph}</p>;
        });
    };

    return (
        <div className="bg-brand-base p-8 rounded-lg shadow-xl mb-16">
            <h2 className="text-3xl font-bold font-heading text-white mb-6 text-center">Ask Our AI Guide</h2>
            <p className="text-center text-brand-muted mb-8 max-w-2xl mx-auto">
                Have a specific question? Ask 'Askari', our AI guide, for in-depth advice on training, culture, gear, and more.
            </p>

            {!hasApiKey ? (
                <p className="text-center text-yellow-400 p-4 border border-yellow-400 rounded-md">Please configure your API key to use this feature.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
                    <div>
                        <label htmlFor="ai-question" className="block text-sm font-medium text-brand-light mb-2">Your Question:</label>
                        <textarea
                            id="ai-question"
                            rows={3}
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            className="w-full bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="e.g., What are some cultural customs I should know in Hunza?"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center transform rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400 disabled:bg-gray-500">
                            {isLoading ? <Spinner /> : "Ask Askari"}
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-8 max-w-3xl mx-auto">
                {error && <p className="text-red-400 text-center">{error}</p>}
                {answer && (
                    <div className="animate-fade-in-up bg-brand-dark p-6 rounded-lg">
                        <h3 className="text-xl font-bold font-heading text-white mb-4">Askari's Advice:</h3>
                        <div className="space-y-4 text-brand-light">
                            {formatAnswerText(answer)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIAskAGuide;