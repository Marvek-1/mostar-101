import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Consciousness from './sections/Consciousness';
import CoreDrivers from './sections/CoreDrivers';
import MostarAI from './sections/MostarAI';
import Characters from './sections/Characters';
import Doctrine from './sections/Doctrine';
import Artifacts from './sections/Artifacts';
import Footer from './sections/Footer';
import AgentDetail from './pages/AgentDetail';
import GuardianDetail from './pages/GuardianDetail';
import Agents from './pages/Agents';
import Guardians from './pages/Guardians';

// Home page component with all sections
const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-mostar-dark-900 text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <main>
        <Hero />
        <Consciousness />
        <CoreDrivers />
        <MostarAI />
        <Characters />
        <Doctrine />
        <Artifacts />
      </main>
      <Footer />
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/guardians" element={<Guardians />} />
        <Route path="/guardian/:id" element={<GuardianDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

