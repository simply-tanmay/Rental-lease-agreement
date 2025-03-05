import React, { useState } from 'react';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import LeaseAgreementABI from './LeaseAgreementABI.json';

// Replace with your deployed contract address
const contractAddress = "0xbD399BED192F6FD3A13460Beb923d6101610Aa90";

const LeaseActions = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Helper function to get a contract instance with a signer
  const getContractWithSigner = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, LeaseAgreementABI, signer);
    return contract;
  };

  // Function to sign the lease (sends the security deposit)
  const handleSignLease = async () => {
    try {
      setStatus("Signing lease...");
      setError('');
      const contract = await getContractWithSigner();
      // Call signLease() with the required security deposit (assumed 2 ETH here)
      const tx = await contract.signLease({ value: parseEther("2") });
      await tx.wait();
      setStatus("Lease signed successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to sign lease: " + err.message);
      setStatus('');
    }
  };

  // Function to pay rent (sends the rent amount)
  const handlePayRent = async () => {
    try {
      setStatus("Paying rent...");
      setError('');
      const contract = await getContractWithSigner();
      // Call payRent() with the required rent amount (assumed 1 ETH here)
      const tx = await contract.payRent({ value: parseEther("1") });
      await tx.wait();
      setStatus("Rent paid successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to pay rent: " + err.message);
      setStatus('');
    }
  };

  // Function to terminate the lease
  const handleTerminateLease = async () => {
    try {
      setStatus("Terminating lease...");
      setError('');
      const contract = await getContractWithSigner();
      const tx = await contract.terminateLease();
      await tx.wait();
      setStatus("Lease terminated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to terminate lease: " + err.message);
      setStatus('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Lease Actions</h2>
      <div className="space-y-4">
        <button
          onClick={handleSignLease}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Sign Lease
        </button>
        <button
          onClick={handlePayRent}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Pay Rent
        </button>
        <button
          onClick={handleTerminateLease}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Terminate Lease
        </button>
      </div>
      {status && <p className="mt-4 text-green-600">{status}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default LeaseActions;
