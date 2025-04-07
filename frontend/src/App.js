import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import WalletConnection from './WalletConnection';
import LeaseDashboard from './LeaseDashboard';
import LeaseActions from './LeaseActions';
import LeaseManager from './pages/LeaseManager';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl bg-white shadow p-6 rounded-md mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Lease Agreement DApp</h1>
        <button
          onClick={() => navigate('/manage')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Manage Lease
        </button>
      </header>
      <main className="w-full max-w-4xl">
        <WalletConnection />
        <div className="mt-8">
          <LeaseDashboard />
        </div>
        <div className="mt-8">
          <LeaseActions />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<LeaseManager />} />
      </Routes>
    </Router>
  );
}

export default App;
