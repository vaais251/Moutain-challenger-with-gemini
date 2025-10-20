import React, { useState } from 'react';
import { FAQS } from '../constants';
import type { FAQItem } from '../types';
import AIPackingAdvisor from '../components/AIPackingAdvisor';
import AIAskAGuide from '../components/AIAskAGuide';

interface FaqItemProps {
    faq: FAQItem;
    isOpen: boolean;
    onClick: () => void;
}

// Fix: Changed component definition to use React.FC to correctly type props and resolve issue with the 'key' prop.
const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-700">
            <button
                className="flex justify-between items-center w-full py-5 text-left"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-accent"><path d="m6 9 6 6 6-6"></path></svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="pb-5 pr-4 text-brand-muted">
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};


const FAQ: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const handleClick = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-brand-dark pt-16 min-h-screen">
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/faq-banner/1920/600')" }}>
                <div className="absolute inset-0 bg-hero-gradient flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-heading uppercase text-white">Frequently Asked Questions</h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl">Your questions, answered. Everything you need to know to plan your adventure.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <AIAskAGuide />
                    <AIPackingAdvisor />

                    <h2 className="text-4xl font-extrabold font-heading uppercase text-center text-white mt-20 mb-10">General Questions</h2>
                    {FAQS.map(faq => (
                        <FaqItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onClick={() => handleClick(faq.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;