import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import LiveChatWidget from './components/LiveChatWidget';

const Home = lazy(() => import('./pages/Home'));
const Expeditions = lazy(() => import('./pages/Expeditions'));
const ExpeditionDetail = lazy(() => import('./pages/ExpeditionDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AITripPlanner = lazy(() => import('./pages/AITripPlanner'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blog = lazy(() => import('./pages/Blog'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));


const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex justify-center items-center h-screen bg-brand-primary">
              <Spinner />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/expeditions" element={<Expeditions />} />
              <Route path="/expeditions/:id" element={<ExpeditionDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ai-planner" element={<AITripPlanner />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<ArticleDetail />} />
            </Routes>
          </Suspense>
        </main>
        <LiveChatWidget />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;