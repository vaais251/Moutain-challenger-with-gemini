import { LatLngExpression } from 'leaflet';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  coordinates?: { lat: number; lng: number };
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
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
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

export interface MapMarker {
  coords: { lat: number; lng: number };
  popupText: string;
}

export interface PackingListItem {
  itemName: string;
  quantity: string;
  notes: string;
}

export interface PackingListCategory {
  categoryName: string;
  items: PackingListItem[];
}

export interface PackingList {
    packingList: PackingListCategory[];
}

export interface AlternativeTrip {
  title: string;
  description: string;
}