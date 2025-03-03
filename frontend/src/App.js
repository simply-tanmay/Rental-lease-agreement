import React from 'react';
import WalletConnection from './WalletConnection';
import LeaseDashboard from './LeaseDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl bg-white shadow p-6 rounded-md mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Lease Agreement DApp</h1>
      </header>
      <main className="w-full max-w-4xl">
        <WalletConnection />
        <div className="mt-8">
          <LeaseDashboard />
        </div>
      </main>
    </div>
  );
}

export default App;
