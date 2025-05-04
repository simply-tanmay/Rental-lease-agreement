import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnection = () => {
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  // Always open MetaMask popup for account selection
  const openMetaMask = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask to use this application');
        return;
      }
      // This will always open the MetaMask popup
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      setError('Failed to open MetaMask');
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (err) {
          console.error('Error checking MetaMask connection:', err);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  return (
    <div>
      {account ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={openMetaMask}
            className="button text-sm"
          >
            Connect Account
          </button>
        </div>
      ) : (
        <button
          onClick={openMetaMask}
          className="button"
        >
          Connect Wallet
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default WalletConnection; 