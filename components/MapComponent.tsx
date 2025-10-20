import React, { useEffect, useRef } from 'react';
import type { MapMarker } from '../types';

// Add a global declaration for the Leaflet library loaded from the CDN
declare global {
    interface Window {
        L: any;
    }
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MapMarker[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, markers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any | null>(null);
  const markersRef = useRef<any[]>([]);

  // Effect for initializing the map
  useEffect(() => {
    if (!mapRef.current || !window.L) return;

    // Fix for default marker icon paths when using a bundler/CDN
    delete window.L.Icon.Default.prototype._getIconUrl;
    window.L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    
    // Prevent re-initialization
    if (!mapInstance.current) {
        const map = window.L.map(mapRef.current).setView([center.lat, center.lng], zoom);
        mapInstance.current = map;

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    // Cleanup on unmount
    return () => {
        if (mapInstance.current) {
            mapInstance.current.remove();
            mapInstance.current = null;
        }
    };
  }, []); // Empty dependency array: runs only once on mount

  // Effect for updating markers
  useEffect(() => {
    if (mapInstance.current && markers) {
        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        const newMarkers = markers.map(markerInfo => {
            const marker = window.L.marker([markerInfo.coords.lat, markerInfo.coords.lng])
                .addTo(mapInstance.current)
                .bindPopup(markerInfo.popupText);
            return marker;
        });
        markersRef.current = newMarkers;

        // Fit map to markers if there are any
        if (newMarkers.length > 0) {
            const group = window.L.featureGroup(newMarkers);
            mapInstance.current.fitBounds(group.getBounds().pad(0.2));
        }
    }
  }, [markers]);

   // Effect for updating view center/zoom when markers are not present
    useEffect(() => {
        if (mapInstance.current && markers.length === 0) {
            mapInstance.current.setView([center.lat, center.lng], zoom);
        }
    }, [center, zoom, markers]);


  return <div ref={mapRef} style={{ height: '450px', width: '100%' }} className="rounded-lg shadow-lg bg-brand-dark" />;
};

export default MapComponent;