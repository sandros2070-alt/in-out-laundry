
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Routes wrapped in Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/booking" element={<Layout><Booking /></Layout>} />
          
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
