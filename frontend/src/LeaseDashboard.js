import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import LeaseAgreementABI from './LeaseAgreementABI.json';

// Replace with your deployed contract address
import config from './config';
const contractAddress = config.contractAddress;

const LeaseDashboard = () => {
  const [leaseData, setLeaseData] = useState(null);
  const [error, setError] = useState('');

  const fetchLeaseData = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, LeaseAgreementABI, provider);

        const landlord = await contract.landlord();
        const tenant = await contract.tenant();
        const rentAmount = await contract.rentAmount();
        const securityDeposit = await contract.securityDeposit();
        const leaseStart = await contract.leaseStart();
        const leaseEnd = await contract.leaseEnd();
        const isActive = await contract.isActive();

        // Convert BigInts to numbers using Number()
        const leaseStartTimeNumber = Number(leaseStart);
        const leaseEndTimeNumber = Number(leaseEnd);

        setLeaseData({
          landlord,
          tenant,
          rent: formatEther(rentAmount),
          securityDeposit: formatEther(securityDeposit),
          leaseStart: new Date(leaseStartTimeNumber * 1000).toLocaleString(),
          leaseEnd: new Date(leaseEndTimeNumber * 1000).toLocaleString(),
          isActive,
        });
      } catch (err) {
        console.error("Error fetching lease data:", err);
        setError("Failed to fetch lease data from the contract.");
      }
    } else {
      setError("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    fetchLeaseData();
  }, []);

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md text-red-500">
        {error}
      </div>
    );
  }

  if (!leaseData) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
        Loading lease data...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Lease Agreement Details</h2>
      <div className="space-y-2">
        <p><strong>Landlord:</strong> {leaseData.landlord}</p>
        <p><strong>Tenant:</strong> {leaseData.tenant}</p>
        <p><strong>Rent:</strong> {leaseData.rent} ETH</p>
        <p><strong>Security Deposit:</strong> {leaseData.securityDeposit} ETH</p>
        <p><strong>Lease Start:</strong> {leaseData.leaseStart}</p>
        <p><strong>Lease End:</strong> {leaseData.leaseEnd}</p>
        <p><strong>Status:</strong> {leaseData.isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};

export default LeaseDashboard;
