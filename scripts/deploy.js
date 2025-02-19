const { ethers } = require("hardhat");

async function main() {
  const LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
  const lease = await LeaseAgreement.deploy(
    "0xYourTenantAddressHere",         // Replace with a valid tenant address
    ethers.parseEther("1"),            // Rent: 1 ETH
    ethers.parseEther("2"),            // Security Deposit: 2 ETH
    30 * 24 * 60 * 60                 // Lease Duration: 30 days in seconds
  );

  await lease.deployed();
  console.log("LeaseAgreement deployed to:", lease.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
