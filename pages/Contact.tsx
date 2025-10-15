
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        // Mock form submission
        setTimeout(() => {
            setStatus('Your message has been sent successfully!');
            // Fix: Corrected TypeScript type from `HTMLFormEvent` to `HTMLFormElement`
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <div className="bg-brand-primary pt-16">
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/contact-banner/1920/600')" }}>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <h1 className="text-5xl font-extrabold text-white text-center">Get In Touch</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-brand-secondary p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-brand-light">Full Name</label>
                                <input type="text" id="name" required className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-brand-light">Email Address</label>
                                <input type="email" id="email" required className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-brand-light">Message</label>
                                <textarea id="message" rows={5} required className="mt-1 block w-full bg-brand-primary border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-brand-accent focus:border-brand-accent"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full transform rounded-md bg-brand-accent px-6 py-3 text-lg font-semibold text-brand-primary shadow-lg transition hover:-translate-y-1 hover:bg-yellow-400">
                                    Send Message
                                </button>
                            </div>
                            {status && <p className="text-center text-brand-accent mt-4">{status}</p>}
                        </form>
                    </div>

                    <div className="text-brand-light">
                         <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                         <p className="mb-8 text-lg text-gray-300">
                             Have questions or ready to book your next big adventure? Reach out to us. We're here to help you plan an unforgettable journey.
                         </p>
                         <div className="space-y-6">
                             <div className="flex items-start gap-4">
                                <span className="text-brand-accent text-2xl mt-1">📍</span>
                                <div>
                                    <h3 className="font-semibold text-xl">Address</h3>
                                    <p className="text-gray-400">Mountain Challenger Office, Ali Abad, Hunza, Gilgit-Baltistan, Pakistan</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <span className="text-brand-accent text-2xl mt-1">✉️</span>
                                <div>
                                    <h3 className="font-semibold text-xl">Email</h3>
                                    <p className="text-gray-400">info@mountainchallenger.com</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <span className="text-brand-accent text-2xl mt-1">📞</span>
                                <div>
                                    <h3 className="font-semibold text-xl">Phone</h3>
                                    <p className="text-gray-400">+92 123 456 7890</p>
                                </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;