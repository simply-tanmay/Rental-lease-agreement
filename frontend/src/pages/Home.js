import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
          Smart Leaser!
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A decentralized application for managing rental agreements on the blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card hover:border-accent transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-400 mb-4">
            This DApp allows landlords and tenants to create and manage lease agreements
            on the Ethereum blockchain. All agreements are transparent, immutable, and
            enforceable through smart contracts.
          </p>
          <Link to="/manage" className="button inline-block">
            Get Started
          </Link>
        </div>

        <div className="card hover:border-accent transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Secure and transparent lease agreements
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Automated rent payments
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Digital security deposits
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Immutable contract terms
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Real-time lease status updates
            </li>
          </ul>
        </div>
      </div>

      <div className="card mt-8 hover:border-accent transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg hover:bg-gray-900 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 text-accent">1. Create Agreement</h3>
            <p className="text-gray-400">
              Landlord creates a lease agreement with terms, rent amount, and duration
            </p>
          </div>
          <div className="p-4 rounded-lg hover:bg-gray-900 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 text-accent">2. Sign Contract</h3>
            <p className="text-gray-400">
              Tenant reviews and signs the agreement by sending the security deposit
            </p>
          </div>
          <div className="p-4 rounded-lg hover:bg-gray-900 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 text-accent">3. Manage Lease</h3>
            <p className="text-gray-400">
              Both parties can monitor payments, status, and manage the lease terms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 