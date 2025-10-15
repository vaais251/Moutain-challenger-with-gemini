
import React, { useState, Fragment } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  expeditionName: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, expeditionName }) => {
    const [status, setStatus] = useState('');
    
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        setTimeout(() => {
            setStatus('Thank you for your enquiry! We will get back to you shortly.');
            setTimeout(() => {
                onClose();
                setStatus('');
            }, 3000);
        }, 1500);
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full max-w-lg p-4 mx-auto bg-brand-secondary rounded-lg shadow-xl">
                <div className="flex justify-between items-center pb-3 border-b border-gray-600">
                    <h3 className="text-2xl font-bold text-white" id="modal-title">Enquire About Your Trip</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-brand-primary hover:text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-4">You are enquiring about: <strong className="text-brand-accent">{expeditionName}</strong></p>
                    {status ? (
                        <p className="text-center text-brand-accent py-10">{status}</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-brand-light">Full Name</label>
                                <input type="text" id="name" required className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-brand-light">Email Address</label>
                                <input type="email" id="email" required className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-brand-light">Your Message (Optional)</label>
                                <textarea id="message" rows={4} placeholder="Any specific questions? Let us know!" className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"></textarea>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="w-full transform rounded-md bg-brand-accent px-6 py-3 text-lg font-semibold text-brand-primary shadow-lg transition hover:-translate-y-1 hover:bg-yellow-400">
                                    Send Enquiry
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnquiryModal;
