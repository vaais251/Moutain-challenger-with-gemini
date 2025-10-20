import type { Expedition, Guide, Testimonial, NavLink, FAQItem, GalleryImage, BlogPost } from './types';

export const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/expeditions', label: 'Expeditions' },
  { path: '/ai-planner', label: 'AI Planner' },
  { path: '/about', label: 'About Us' },
  { 
    path: '#', 
    label: 'More',
    dropdown: [
        { path: '/gallery', label: 'Gallery' },
        { path: '/blog', label: 'Blog' },
        { path: '/faq', label: 'FAQ' },
        { path: '/ai-dream-itinerary', label: 'Dream Visualizer' },
    ]
  },
  { path: '/contact', label: 'Contact' },
];

export const EXPEDITIONS: Expedition[] = [
  {
    id: 'k2-base-camp-gondogoro-la',
    name: 'K2 Base Camp & Gondogoro La Trek',
    shortDescription: 'The ultimate trek to the foot of the world\'s second-highest peak, K2.',
    longDescription: 'This world-renowned trek is a must for serious adventurers. It takes you through some of the most spectacular mountain scenery on Earth, culminating in the breathtaking view at Concordia, the "Throne Room of the Mountain Gods", and the challenging Gondogoro La pass crossing.',
    duration: 21,
    difficulty: 'Expert',
    bestSeason: 'June to September',
    image: 'https://picsum.photos/seed/k2/800/600',
    gallery: [
      'https://picsum.photos/seed/k2-concordia/1200/800',
      'https://picsum.photos/seed/gondogoro-la/1200/800',
      'https://picsum.photos/seed/baltoro-glacier/1200/800'
    ],
    mapCenter: { lat: 35.75, lng: 76.0 },
    mapZoom: 9,
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Transfer to hotel and briefing.', coordinates: { lat: 33.6844, lng: 73.0479 } },
      { day: 2, title: 'Fly to Skardu', description: 'A scenic flight to the gateway of the Karakoram.', coordinates: { lat: 35.2971, lng: 75.6333 } },
      { day: 3, title: 'Acclimatization in Skardu', description: 'Prepare for the trek and explore the local area.', coordinates: { lat: 35.2971, lng: 75.6333 } },
      { day: 6, title: 'Drive to Askole', description: 'The last village before entering the wilderness.', coordinates: { lat: 35.6833, lng: 75.8167 } },
      { day: 7, title: 'Trek to Concordia', description: 'Trekking along the mighty Baltoro Glacier.', coordinates: { lat: 35.756, lng: 76.513 } },
      { day: 13, title: 'K2 Base Camp Excursion', description: 'A day trip to the base camp of K2.', coordinates: { lat: 35.802, lng: 76.515 } },
      { day: 14, title: 'Cross Gondogoro La', description: 'The challenging pass crossing into the Hushe Valley.', coordinates: { lat: 35.6667, lng: 76.4167 } },
      { day: 17, title: 'Trek to Hushe', description: 'Descending through the beautiful Hushe Valley.', coordinates: { lat: 35.4333, lng: 76.35 } },
      { day: 20, title: 'Drive to Skardu', description: 'Return to civilization.', coordinates: { lat: 35.2971, lng: 75.6333 } },
      { day: 21, title: 'Fly to Islamabad / Departure', description: 'Fly back to Islamabad for your journey home.', coordinates: { lat: 33.6844, lng: 73.0479 } },
    ],
    included: ['All domestic flights', 'Licensed guides', 'All meals during trek', 'Porterage', 'All accommodations'],
    excluded: ['International airfare', 'Personal gear', 'Tips', 'Visa fees'],
  },
  {
    id: 'nanga-parbat-base-camp',
    name: 'Nanga Parbat Base Camp Trek',
    shortDescription: 'Explore the stunning meadows and base camps of the "Killer Mountain".',
    longDescription: 'This trek offers diverse landscapes, from the lush green Fairy Meadows to the stark, icy base camps of Nanga Parbat. It is less strenuous than the K2 trek but offers equally dramatic views and a rich cultural experience.',
    duration: 14,
    difficulty: 'Advanced',
    bestSeason: 'May to October',
    image: 'https://picsum.photos/seed/nanga-parbat/800/600',
    gallery: [
      'https://picsum.photos/seed/fairy-meadows/1200/800',
      'https://picsum.photos/seed/raikot-face/1200/800',
      'https://picsum.photos/seed/rupal-face/1200/800'
    ],
    mapCenter: { lat: 35.3, lng: 74.7 },
    mapZoom: 9,
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Transfer to hotel.', coordinates: { lat: 33.6844, lng: 73.0479 } },
      { day: 2, title: 'Drive to Chilas', description: 'Travel along the famous Karakoram Highway.', coordinates: { lat: 35.412, lng: 74.103 } },
      { day: 3, title: 'Drive to Raikot Bridge & Jeep to Tattu', description: 'Begin the adventure towards Fairy Meadows.', coordinates: { lat: 35.37, lng: 74.59 } },
      { day: 4, title: 'Trek to Fairy Meadows', description: 'A short trek to the iconic viewpoint.', coordinates: { lat: 35.39, lng: 74.58 } },
      { day: 5, title: 'Explore Nanga Parbat Base Camp (Raikot Face)', description: 'Day hike to the base camp.', coordinates: { lat: 35.37, lng: 74.60 } },
      { day: 6, title: 'Return to Tattu and drive to Astore', description: 'Journey to the other side of the mountain.', coordinates: { lat: 35.36, lng: 74.88 } },
      { day: 7, title: 'Drive to Tarashing', description: 'The starting point for the Rupal Face trek.', coordinates: { lat: 35.21, lng: 74.99 } },
      { day: 8, title: 'Trek to Herligkoffer Base Camp (Rupal Face)', description: 'Experience the sheer south face of Nanga Parbat.', coordinates: { lat: 35.23, lng: 74.58 } },
      { day: 10, title: 'Return to Tarashing', description: 'Trek back.', coordinates: { lat: 35.21, lng: 74.99 } },
      { day: 11, title: 'Drive to Gilgit', description: 'Explore the capital of Gilgit-Baltistan.', coordinates: { lat: 35.9208, lng: 74.3144 } },
      { day: 12, title: 'Drive to Besham', description: 'Continue the journey back on the KKH.', coordinates: { lat: 34.93, lng: 72.87 } },
      { day: 13, title: 'Drive to Islamabad', description: 'Return to the capital city.', coordinates: { lat: 33.6844, lng: 73.0479 } },
      { day: 14, title: 'Departure', description: 'Fly home.', coordinates: { lat: 33.6844, lng: 73.0479 } },
    ],
    included: ['Private transport', 'Experienced guides', 'All meals on trek', 'Camping equipment', 'Hotel stays'],
    excluded: ['International flights', 'Insurance', 'Personal expenses', 'Drinks'],
  },
  {
    id: 'hunza-valley-cultural-trek',
    name: 'Hunza Valley Cultural Trek',
    shortDescription: 'A gentle trek exploring the culture, history, and beauty of the Hunza Valley.',
    longDescription: 'Perfect for those who want a mix of light trekking and cultural immersion. Discover ancient forts, picturesque villages, and the legendary hospitality of the Hunza people, all while surrounded by towering peaks like Rakaposhi and Ultar Sar.',
    duration: 10,
    difficulty: 'Beginner',
    bestSeason: 'April to October',
    image: 'https://picsum.photos/seed/hunza/800/600',
    gallery: [
      'https://picsum.photos/seed/baltit-fort/1200/800',
      'https://picsum.photos/seed/attabad-lake/1200/800',
      'https://picsum.photos/seed/passu-cones/1200/800'
    ],
    mapCenter: { lat: 36.35, lng: 74.75 },
    mapZoom: 10,
    itinerary: [
        { day: 1, title: 'Arrival in Islamabad', description: 'Welcome and transfer to hotel.', coordinates: { lat: 33.6844, lng: 73.0479 } },
        { day: 2, title: 'Fly to Gilgit, Drive to Hunza', description: 'A scenic flight and drive to Karimabad.', coordinates: { lat: 36.326, lng: 74.668 } },
        { day: 3, title: 'Explore Karimabad', description: 'Visit Baltit and Altit Forts.', coordinates: { lat: 36.326, lng: 74.668 } },
        { day: 4, title: 'Trek to Ultar Meadows', description: 'A day hike with spectacular views of Ultar Sar.', coordinates: { lat: 36.4, lng: 74.7 } },
        { day: 5, title: 'Visit Attabad Lake & Passu', description: 'See the iconic blue lake and Passu Cones.', coordinates: { lat: 36.31, lng: 74.86 } },
        { day: 6, title: 'Hike on Passu Glacier', description: 'A gentle glacier walk.', coordinates: { lat: 36.48, lng: 74.88 } },
        { day: 7, title: 'Explore Gojal Valley', description: 'Visit Hussaini Suspension Bridge.', coordinates: { lat: 36.42, lng: 74.87 } },
        { day: 8, title: 'Drive back to Gilgit', description: 'Time for souvenir shopping.', coordinates: { lat: 35.9208, lng: 74.3144 } },
        { day: 9, title: 'Fly to Islamabad', description: 'Return flight to the capital.', coordinates: { lat: 33.6844, lng: 73.0479 } },
        { day: 10, title: 'Departure', description: 'End of the tour.', coordinates: { lat: 33.6844, lng: 73.0479 } },
    ],
    included: ['Domestic flights', 'A/C Transport', 'Expert local guide', 'All hotel accommodations (3-star)', 'All entry fees'],
    excluded: ['International flights', 'Lunches and dinners in cities', 'Visa', 'Tips'],
  }
];

export const GUIDES: Guide[] = [
  {
    id: 1,
    name: 'Hassan Sadpara',
    role: 'Lead Expedition Guide',
    bio: 'With over 20 years of experience and multiple 8000m summits, Hassan is a legend in the Karakoram. His leadership and knowledge are unparalleled, ensuring safety and success on our most challenging expeditions.',
    image: 'https://picsum.photos/seed/hassan/400/400'
  },
  {
    id: 2,
    name: 'Fatima Ali',
    role: 'Cultural & Trekking Guide',
    bio: 'Fatima was born and raised in the Hunza Valley. Her deep understanding of the local culture, history, and flora makes every trek an enriching educational experience. She is passionate about sustainable tourism.',
    image: 'https://picsum.photos/seed/fatima/400/400'
  },
  {
    id: 3,
    name: 'Karim Baig',
    role: 'High Altitude Specialist',
    bio: 'Karim is our expert in high-altitude logistics and safety. He has guided clients on technical peaks across Pakistan and is certified in wilderness first response, making him a crucial member of our team.',
    image: 'https://picsum.photos/seed/karim/400/400'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    country: 'Canada',
    quote: 'The K2 Base Camp trek was the adventure of a lifetime. Mountain Challenger\'s team was professional, supportive, and incredibly knowledgeable. I felt safe even in the most remote areas. Highly recommended!',
    image: 'https://picsum.photos/seed/alex/100/100'
  },
  {
    id: 2,
    name: 'Sophia Mueller',
    country: 'Germany',
    quote: 'Our trip to Hunza was magical. Our guide, Fatima, was amazing and shared so much about the local culture. The organization was flawless from start to finish. Thank you, Mountain Challenger!',
    image: 'https://picsum.photos/seed/sophia/100/100'
  },
  {
    id: 3,
    name: 'Kenji Tanaka',
    country: 'Japan',
    quote: 'Trekking to Nanga Parbat base camp was a dream come true. The views were beyond words, and the logistics were handled perfectly by the team. I will be back for another adventure with this company.',
    image: 'https://picsum.photos/seed/kenji/100/100'
  }
];

export const FAQS: FAQItem[] = [
    {
        id: 1,
        question: 'Is it safe to travel to Gilgit-Baltistan, Pakistan?',
        answer: 'Yes, Gilgit-Baltistan is one of the safest regions in Pakistan and is very welcoming to tourists. We take comprehensive security measures, including experienced local guides and adherence to all local advice, to ensure your safety throughout the trip.'
    },
    {
        id: 2,
        question: 'What level of fitness is required for these treks?',
        answer: 'Fitness requirements vary by trek. Our "Beginner" treks are suitable for anyone with a good walking fitness, while "Expert" treks like K2 Base Camp require excellent cardiovascular health, strength, and experience with multi-day hiking at altitude.'
    },
    {
        id: 3,
        question: 'How do I get a visa for Pakistan?',
        answer: 'Most nationalities can now apply for a tourist visa online through Pakistan\'s official e-visa portal. The process is relatively straightforward. We provide a Letter of Invitation (LOI) and any other required documentation to support your application after you book a trip with us.'
    },
    {
        id: 4,
        question: 'What is the best time of year to trek in the Karakoram?',
        answer: 'The main trekking season is from June to September. During these months, the weather is generally stable, and the high passes are snow-free. For lower altitude and cultural tours, April, May, and October are also beautiful months.'
    },
    {
        id: 5,
        question: 'What kind of accommodation can I expect?',
        answer: 'In cities like Islamabad and Skardu, we use comfortable 3-star hotels. During the treks, you will be staying in high-quality dome tents. We provide a mess tent for meals and a toilet tent for convenience.'
    },
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, src: 'https://picsum.photos/seed/gallery-k2/600/400', alt: 'K2 Peak at sunset', category: 'Peaks' },
    { id: 2, src: 'https://picsum.photos/seed/gallery-hunza/600/400', alt: 'Hunza Valley in autumn', category: 'Valleys' },
    { id: 3, src: 'https://picsum.photos/seed/gallery-baltoro/600/400', alt: 'Trekking on the Baltoro Glacier', category: 'Glaciers' },
    { id: 4, src: 'https://picsum.photos/seed/gallery-people/600/400', alt: 'Local children in a village', category: 'Culture' },
    { id: 5, src: 'https://picsum.photos/seed/gallery-nanga/600/400', alt: 'Nanga Parbat Rupal Face', category: 'Peaks' },
    { id: 6, src: 'https://picsum.photos/seed/gallery-passu/600/400', alt: 'Passu Cones in Gojal Valley', category: 'Valleys' },
    { id: 7, src: 'https://picsum.photos/seed/gallery-fort/600/400', alt: 'Baltit Fort in Karimabad', category: 'Culture' },
    { id: 8, src: 'https://picsum.photos/seed/gallery-gondogoro/600/400', alt: 'Crossing the Gondogoro La pass', category: 'Glaciers' },
    { id: 9, src: 'https://picsum.photos/seed/gallery-ladyfinger/600/400', alt: 'Ladyfinger Peak, Bublimotin', category: 'Peaks' },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '10-essential-tips-for-k2-trek',
        title: '10 Essential Tips for Preparing for the K2 Base Camp Trek',
        author: 'Hassan Sadpara',
        date: 'July 15, 2024',
        excerpt: 'The trek to K2 Base Camp is not for the faint of heart. Here are my top 10 tips to ensure you arrive prepared, healthy, and ready for the adventure of a lifetime...',
        image: 'https://picsum.photos/seed/blog-k2-prep/800/500',
        category: 'Trekking Tips',
        content: `
        <p>The trek to K2 Base Camp is a serious undertaking that demands respect and thorough preparation. Having guided countless groups along the Baltoro Glacier, I've seen what works and what doesn't. Here are my essential tips:</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">1. Physical Conditioning is Key</h3>
        <p>Start training at least 3-4 months in advance. Focus on cardiovascular fitness (running, cycling, swimming) and strength training, especially for your legs and core. Practice long hikes with a weighted backpack.</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">2. Acclimatize Properly</h3>
        <p>Our itinerary is designed for gradual acclimatization, but listen to your body. Drink plenty of water (4-5 liters a day), walk slowly ("pole, pole"), and never ascend too quickly. Diamox can be helpful, but consult your doctor first.</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">3. Invest in Quality Gear</h3>
        <p>Your boots, sleeping bag, and outerwear are your most important pieces of gear. Broken-in, waterproof hiking boots are non-negotiable. A sleeping bag rated to at least -15°C is essential. Layering is crucial, so bring moisture-wicking base layers, fleece mid-layers, and a waterproof/windproof shell.</p>
        `
    },
    {
        id: 'a-taste-of-hunza',
        title: 'A Taste of Hunza: Discovering the Culinary Delights of the Valley',
        author: 'Fatima Ali',
        date: 'June 28, 2024',
        excerpt: 'Beyond the stunning peaks, Hunza offers a unique and delicious culinary tradition. From apricot soup to walnut cake, discover the flavors that define this magical place...',
        image: 'https://picsum.photos/seed/blog-hunza-food/800/500',
        category: 'Cultural Stories',
        content: `
        <p>When you visit Hunza, you're in for a treat for your eyes and your taste buds. Our local cuisine is healthy, organic, and deeply connected to the land. Here are a few dishes you must try:</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">Gyaling or Gral</h3>
        <p>A hearty, savory pancake made from whole wheat flour, often filled with spinach or other local greens and served with apricot oil. It's the perfect fuel for a day of hiking.</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">Harisa</h3>
        <p>A slow-cooked stew of wheat, meat, and lentils, similar to a porridge. It's a traditional dish served at weddings and special occasions, known for being incredibly rich and comforting.</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">Apricot Soup (Batering Doudo)</h3>
        <p>A unique, tangy soup made from dried apricots. It's both sweet and sour and is believed to have numerous health benefits. A true taste of the valley!</p>
        `
    },
    {
        id: 'dispatch-from-nanga-parbat',
        title: 'Dispatch from Nanga Parbat: The Killer Mountain\'s Majestic Rupal Face',
        author: 'Karim Baig',
        date: 'August 02, 2024',
        excerpt: 'Standing at the base of the Rupal Face is a humbling experience. At 4,500 meters, it is the highest mountain face in the world, and its sheer scale is impossible to capture in photos...',
        image: 'https://picsum.photos/seed/blog-rupal/800/500',
        category: 'Expedition Reports',
        content: `
        <p>Standing at the base of the Rupal Face is a humbling experience. At 4,500 meters, it is the highest mountain face in the world, and its sheer scale is impossible to capture in photos. Our team arrived at Herligkoffer Base Camp yesterday after a steady two-day trek from Tarashing. Spirits are high, and the views are simply breathtaking.</p>
        <p>The weather has been kind to us so far, with clear skies offering uninterrupted views of Nanga Parbat's icy summit. The sound of distant avalanches is a constant reminder of the mountain's power. For our clients, this is a moment of awe and reflection, the culmination of months of training and dreaming. As a guide, seeing that look of wonder on their faces is the ultimate reward.</p>
        `
    },
    {
        id: 'choosing-the-right-boots',
        title: 'Footnotes: Choosing the Right Hiking Boots for the Karakoram',
        author: 'Hassan Sadpara',
        date: 'May 20, 2024',
        excerpt: 'Your boots are the single most important piece of gear you will bring on a trek. A bad pair can ruin a trip, while the right pair will feel like an extension of your body. Here\'s what to look for...',
        image: 'https://picsum.photos/seed/blog-boots/800/500',
        category: 'Gear Reviews',
        content: `
        <p>I often tell my clients: don't skimp on your boots. In the Karakoram, you'll be walking on varied terrain, from dusty trails and river crossings to rocky moraine and glaciers. Your footwear needs to handle it all.</p>
        <h3 class="text-xl font-bold text-brand-accent mt-4 mb-2">Key Features to Look For:</h3>
        <ul>
            <li><strong>Waterproofing:</strong> A Gore-Tex (or similar) membrane is essential to keep your feet dry from river crossings or unexpected storms.</li>
            <li><strong>Ankle Support:</strong> High-cut boots are crucial for stability on uneven ground, helping to prevent sprains.</li>
            <li><strong>Stiff Sole:</strong> A semi-rigid sole provides support and protection from sharp rocks. It's also necessary if you plan to use crampons on glaciers.</li>
            <li><strong>Fit:</strong> This is the most critical factor. Try on boots in the afternoon (when your feet are slightly swollen) with the socks you plan to hike in. There should be no pressure points, and your heel should be locked in place.</li>
        </ul>
        <p>Remember to break in your boots thoroughly before your trip. Wear them on local hikes for several weeks. Your feet will thank you when you're on the trail to K2!</p>
        `
    },
];