import React, { useState } from 'react';

const WalletConnection = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Function to handle wallet connection
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        setError('Connection request was rejected.');
        console.error(err);
      }
    } else {
      setError('MetaMask is not installed. Please install it to use this dApp!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-lg text-gray-700">
          Connected as: <span className="font-medium">{account}</span>
        </p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default WalletConnection;
