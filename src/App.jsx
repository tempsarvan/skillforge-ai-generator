import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGallery from './components/ProjectsGallery';
import ServicesBreakdown from './components/ServicesBreakdown';
import ArchitectureGenerator from './components/ArchitectureGenerator';
import InteractiveSandbox from './components/InteractiveSandbox';
import ArchitectureNotes from './components/ArchitectureNotes';
import InquireSection from './components/InquireSection';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';

export default function App() {
  const [activeSection, setActiveSection] = useState('works');
  const [preselectedService, setPreselectedService] = useState('');

  const handleInquireClick = (serviceName) => {
    if (serviceName) setPreselectedService(serviceName);
    setActiveSection('inquire');
    const el = document.getElementById('inquire');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', position: 'relative' }}>
      <BackgroundCanvas />
      
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Hero />
        <div className="section-divider"></div>
        <ProjectsGallery onInquireClick={handleInquireClick} />
        <div className="section-divider"></div>
        <ServicesBreakdown onInquireClick={handleInquireClick} />
        <div className="section-divider"></div>
        <ArchitectureGenerator onInquireClick={handleInquireClick} />
        <div className="section-divider"></div>
        <InteractiveSandbox />
        <div className="section-divider"></div>
        <ArchitectureNotes />
        <div className="section-divider"></div>
        <InquireSection preselectedService={preselectedService} />
      </main>

      <Footer onInquireClick={handleInquireClick} />
    </div>
  );
}
