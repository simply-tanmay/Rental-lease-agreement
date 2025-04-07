const { ethers } = require("hardhat");

async function main() {
  const [landlord, tenant] = await ethers.getSigners(); // Get two different accounts

  console.log("Deploying contract with account (Landlord):", landlord.address);
  console.log("Tenant address:", tenant.address);

  const rent = ethers.parseEther("1"); // Rent in ETH
  const deposit = ethers.parseEther("2"); // Security deposit in ETH
  const leaseStart = Math.floor(Date.now() / 1000); // Current time as UNIX timestamp
  const leaseEnd = leaseStart + 30 * 24 * 60 * 60; // Lease duration of 30 days

  const LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
  const lease = await LeaseAgreement.deploy(
    landlord.address, // Landlord's address
    tenant.address,   // Tenant's address
    rent,
    deposit,
    leaseStart,
    leaseEnd
  );

  await lease.waitForDeployment();
  const contractAddress = await lease.getAddress(); // Get the deployed contract address
  console.log("LeaseAgreement deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
