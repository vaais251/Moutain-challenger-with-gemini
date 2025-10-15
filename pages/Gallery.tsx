
import React, { useState, useMemo } from 'react';
import { GALLERY_IMAGES } from '../constants';
import type { GalleryImage } from '../types';

type Category = 'All' | 'Peaks' | 'Valleys' | 'Culture' | 'Glaciers';

const Gallery: React.FC = () => {
    const [filter, setFilter] = useState<Category>('All');

    const filteredImages = useMemo(() => {
        if (filter === 'All') return GALLERY_IMAGES;
        return GALLERY_IMAGES.filter(image => image.category === filter);
    }, [filter]);

    const categories: Category[] = ['All', 'Peaks', 'Valleys', 'Glaciers', 'Culture'];

    return (
        <div className="bg-brand-primary pt-16 min-h-screen">
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://picsum.photos/seed/gallery-banner/1920/600')" }}>
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white">Our Gallery</h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl">A glimpse into the majestic beauty of the Karakoram.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                                filter === category 
                                ? 'bg-brand-accent text-brand-primary' 
                                : 'bg-brand-secondary text-white hover:bg-brand-primary'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="mb-4 break-inside-avoid">
                            <img 
                                src={image.src} 
                                alt={image.alt}
                                className="w-full rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
