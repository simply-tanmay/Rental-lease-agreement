const { ethers } = require("hardhat");

async function main() {
  const [landlord, tenant] = await ethers.getSigners(); // Get two different accounts

  console.log("Deploying contract with account (Landlord):", landlord.address);
  console.log("Tenant address:", tenant.address);

  const LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
  const lease = await LeaseAgreement.deploy(
    tenant.address, // Use a different account as the tenant
    ethers.parseEther("1"),
    ethers.parseEther("2"),
    30 * 24 * 60 * 60
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
