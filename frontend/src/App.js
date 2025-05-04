import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LeaseManager from './pages/LeaseManager';
import StarryBackground from './components/StarryBackground';
import Parallax from './components/Parallax';
import WalletConnection from './components/WalletConnection';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="parallax-container">
        <StarryBackground />
        
        <nav className="container py-6 fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.95)] backdrop-blur border-b border-white/10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Smart Leaser</h1>
            <WalletConnection />
          </div>
        </nav>

        <Parallax speed={0.2}>
          <div className="pt-28">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manage" element={<LeaseManager />} />
            </Routes>
          </div>
        </Parallax>
      </div>
    </Router>
  );
}

export default App;
