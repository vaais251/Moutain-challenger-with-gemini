
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface Expedition {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  duration: number; // in days
  difficulty: Difficulty;
  bestSeason: string;
  image: string;
  gallery: string[];
  itinerary: ItineraryItem[];
  included: string[];
  excluded: string[];
}

export interface Guide {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name:string;
  country: string;
  quote: string;
  image: string;
}

export interface NavLink {
  path: string;
  label: string;
  dropdown?: NavLink[];
}

export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: 'Peaks' | 'Valleys' | 'Culture' | 'Glaciers';
}

export type BlogCategory = 'Trekking Tips' | 'Cultural Stories' | 'Expedition Reports' | 'Gear Reviews';

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    image: string;
    content: string;
    category: BlogCategory;
}
