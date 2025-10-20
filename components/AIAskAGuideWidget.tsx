import React, { useState } from 'react';
import { askExpertGuide } from '../services/geminiService';
import Spinner from './Spinner';
import { getApiKey } from '../config';

const GuideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
    </svg>
);

const AIAskAGuideWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState("What are some cultural customs I should know in Hunza?");
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const hasApiKey = !!getApiKey() || !!(window as any).aistudio;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || !hasApiKey) return;

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
        <>
            {/* Modal */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70 animate-fade-in-up" 
                    style={{ animationDuration: '0.3s' }}
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        className="relative w-full max-w-2xl p-4 mx-auto bg-brand-base rounded-lg shadow-xl"
                        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        <div className="flex justify-between items-center pb-3 border-b border-gray-600">
                            <h3 className="text-2xl font-bold font-heading text-white" id="modal-title">Ask Our AI Guide</h3>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-brand-dark hover:text-white">
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="mt-4 max-h-[70vh] overflow-y-auto pr-2">
                             <p className="text-center text-brand-muted mb-6">
                                Have a specific question? Ask 'Askari', our AI guide, for in-depth advice on training, culture, gear, and more.
                            </p>
                            
                            {!hasApiKey ? (
                                <p className="text-center text-yellow-400 p-4 border border-yellow-400 rounded-md">Please configure your API key to use this feature.</p>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="ai-modal-question" className="block text-sm font-medium text-brand-light mb-2">Your Question:</label>
                                        <textarea
                                            id="ai-modal-question"
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

                            <div className="mt-6">
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
                    </div>
                </div>
            )}
            
            {/* Toggle Button */}
            <div className="fixed bottom-24 right-5 z-50">
                 <button
                    onClick={() => setIsOpen(true)}
                    className={`transition-all duration-300 ease-in-out bg-brand-accent text-brand-dark rounded-full p-4 shadow-lg hover:bg-lime-400 transform hover:scale-110 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                    aria-label="Ask our AI Guide"
                >
                    <GuideIcon />
                </button>
            </div>
        </>
    );
};

export default AIAskAGuideWidget;
