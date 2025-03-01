const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
  const lease = await LeaseAgreement.deploy(
    deployer.address, // or another valid tenant address
    ethers.parseEther("1"),
    ethers.parseEther("2"),
    30 * 24 * 60 * 60
  );
  
  await lease.waitForDeployment(); // Wait for the deployment to complete
  const contractAddress = await lease.getAddress(); // Get the deployed contract address
  console.log("LeaseAgreement deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
