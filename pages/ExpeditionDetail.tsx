import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EXPEDITIONS } from '../constants';
import EnquiryModal from '../components/EnquiryModal';
import MapComponent from '../components/MapComponent';
import { MapMarker } from '../types';

const ExpeditionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const expedition = EXPEDITIONS.find(exp => exp.id === id);

    if (!expedition) {
        return (
            <div className="flex items-center justify-center h-screen bg-brand-dark text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-heading">Expedition Not Found</h1>
                    <p className="mt-4">The adventure you're looking for seems to be off the map.</p>
                    <Link to="/expeditions" className="mt-8 inline-block rounded-md bg-brand-accent px-6 py-3 font-semibold text-brand-dark">Back to Expeditions</Link>
                </div>
            </div>
        );
    }
    
    const mapMarkers: MapMarker[] = expedition.itinerary
        .filter(item => item.coordinates)
        .map(item => ({
            coords: item.coordinates!,
            popupText: `<b>Day ${item.day}: ${item.title}</b><br>${item.description}`
        }));

    return (
        <>
            <div className="bg-brand-dark text-brand-light pt-16">
                <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${expedition.gallery[0]})` }}>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                            <h1 className="text-5xl md:text-6xl font-extrabold font-heading uppercase tracking-tight">{expedition.name}</h1>
                            <div className="mt-4 flex justify-center items-center gap-6 text-lg">
                                <span>{expedition.duration} Days</span>
                                <span className="h-5 w-px bg-white/50"></span>
                                <span>{expedition.difficulty}</span>
                                <span className="h-5 w-px bg-white/50"></span>
                                <span>{expedition.bestSeason}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-brand-accent pl-4 font-heading">Overview</h2>
                            <p className="text-lg leading-relaxed text-brand-light">{expedition.longDescription}</p>

                            <h2 className="text-3xl font-bold text-white mt-12 mb-6 border-l-4 border-brand-accent pl-4 font-heading">Route Map</h2>
                            <MapComponent
                                center={expedition.mapCenter}
                                zoom={expedition.mapZoom}
                                markers={mapMarkers}
                            />

                            <h2 className="text-3xl font-bold text-white mt-12 mb-6 border-l-4 border-brand-accent pl-4 font-heading">Day-by-Day Itinerary</h2>
                            <div className="space-y-6 border-l-2 border-gray-700 ml-3">
                                {expedition.itinerary.map(item => (
                                    <div key={item.day} className="relative pl-8">
                                        <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-brand-accent"></div>
                                        <h3 className="text-xl font-semibold text-brand-accent">Day {item.day}: {item.title}</h3>
                                        <p className="mt-1 text-brand-muted">{item.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold text-white mt-12 mb-4 border-l-4 border-brand-accent pl-4 font-heading">Photo Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {expedition.gallery.map((img, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg">
                                        <img src={img} alt={`${expedition.name} gallery image ${index + 1}`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-brand-base p-8 rounded-lg shadow-xl">
                                <h3 className="text-2xl font-bold text-white mb-6 font-heading">Trip Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-brand-accent mb-2">What's Included</h4>
                                        <ul className="list-disc list-inside space-y-1 text-brand-light">
                                            {expedition.included.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-red-400 mb-2">What's Excluded</h4>
                                        <ul className="list-disc list-inside space-y-1 text-brand-light">
                                            {expedition.excluded.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-8 w-full transform rounded-md bg-brand-accent px-8 py-3 text-lg font-bold text-brand-dark shadow-lg transition hover:-translate-y-1 hover:bg-lime-400"
                                >
                                    Enquire Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EnquiryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                expeditionName={expedition.name}
            />
        </>
    );
};

export default ExpeditionDetail;