import { ethers } from "ethers";
import LeaseAgreementABI from "../LeaseAgreementABI.json"; // Must be a pure ABI array

const CONTRACT_ADDRESS = "0xYourActualContractAddress"; // <- Replace with your deployed address

export const getLeaseContract = (signerOrProvider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, LeaseAgreementABI, signerOrProvider);
};

export const fetchLeaseDetails = async (provider) => {
  const contract = getLeaseContract(provider);
  const [
    landlord,
    tenant,
    rentAmount,
    securityDeposit,
    leaseStart,
    leaseEnd,
    isActive
  ] = await Promise.all([
    contract.landlord(),
    contract.tenant(),
    contract.rentAmount(),
    contract.securityDeposit(),
    contract.leaseStart(),
    contract.leaseEnd(),
    contract.isActive()
  ]);

  return {
    landlord,
    tenant,
    rentAmount: ethers.formatEther(rentAmount),
    securityDeposit: ethers.formatEther(securityDeposit),
    leaseStart: leaseStart.toString(),
    leaseEnd: leaseEnd.toString(),
    isActive
  };
};

export const setLeaseDetails = async (
  signer,
  tenantAddress,
  rentWei,
  depositWei,
  leaseStart,
  leaseEnd
) => {
  const contract = getLeaseContract(signer);
  const tx = await contract.setLeaseDetails(
    tenantAddress,
    rentWei,
    depositWei,
    leaseStart,
    leaseEnd
  );
  await tx.wait();
};

export const signLease = async (signer, depositAmount) => {
  const contract = getLeaseContract(signer);
  const tx = await contract.signLease({ value: ethers.parseEther(depositAmount) });
  await tx.wait();
};

export const payRent = async (signer, rentAmount) => {
  const contract = getLeaseContract(signer);
  const tx = await contract.payRent({ value: ethers.parseEther(rentAmount) });
  await tx.wait();
};

export const terminateLease = async (signer) => {
  const contract = getLeaseContract(signer);
  const tx = await contract.terminateLease();
  await tx.wait();
};
