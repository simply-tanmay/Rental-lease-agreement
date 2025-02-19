import { ethers } from "ethers";

// Function to create and return a contract instance
export function getLeaseContract() {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    return null;
  }
  
  // Connect to the provider (MetaMask)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Replace with your deployed contract's address and ABI
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const contractABI = [ /* ABI array from compilation */ ];

  const leaseContract = new ethers.Contract(contractAddress, contractABI, signer);

  return leaseContract;
}
