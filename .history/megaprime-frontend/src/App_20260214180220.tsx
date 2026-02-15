import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ProjectOverview from './components/ProjectOverview';
import NearbyConnectivity from './components/NearbyConnectivity';
import Amenities from './components/Amenities';
import AboutUs from './components/AboutUs';
import ConstructionUpdates from './components/ConstructionUpdates';
import FAQ from './components/FAQ';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <ProjectOverview />
      <NearbyConnectivity />
      <Amenities />
      <AboutUs />
      <ConstructionUpdates />
      <FAQ />
    </div>
  );
}

export default App;
