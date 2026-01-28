
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { MaterialsPage } from './pages/MaterialsPage';
import { PricingPage } from './pages/PricingPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {/* Default fallback to landing */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
