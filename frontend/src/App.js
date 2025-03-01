import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import LeaseAgreementABI from './LeaseAgreementABI.json';

// Replace with your deployed contract's address
const contractAddress = "0xbD399BED192F6FD3A13460Beb923d6101610Aa90";

function App() {
  const [account, setAccount] = useState(null);
  const [landlord, setLandlord] = useState("");

  // Connect to MetaMask wallet
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this dApp!");
    }
  }

  // Fetch contract data (e.g., landlord address)
  async function fetchContractData() {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, LeaseAgreementABI, provider);
      try {
        const landlordAddr = await contract.landlord();
        setLandlord(landlordAddr);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <div className="App">
      <h1>Lease Agreement DApp</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as: {account}</p>
      )}
      <p><strong>Landlord address:</strong> {landlord}</p>
      {/* Additional UI components for contract interaction can go here */}
    </div>
  );
}

export default App;
