const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LeaseAgreement Contract", function () {
  let LeaseAgreement, lease, landlord, tenant, otherAccount;
  const rent = ethers.parseEther("1");
  const deposit = ethers.parseEther("2");
  const duration = 30 * 24 * 60 * 60; // 30 days in seconds

  beforeEach(async function () {
    [landlord, tenant, otherAccount] = await ethers.getSigners();
    LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
    lease = await LeaseAgreement.deploy(tenant.address, rent, deposit, duration);
    await lease.waitForDeployment();  // Use waitForDeployment instead of deployed()
  });
  

  it("should emit LeaseSigned event when tenant signs the lease", async function () {
    // Tenant calls signLease with the correct deposit
    await expect(lease.connect(tenant).signLease({ value: deposit }))
      .to.emit(lease, "LeaseSigned")
      .withArgs(landlord.address, tenant.address, rent, await lease.leaseEnd());
  });

  it("should emit RentPaid event when tenant pays rent", async function () {
    // First, tenant signs the lease to ensure it's active (if your business logic requires that)
    await lease.connect(tenant).signLease({ value: deposit });
    
    // Then, tenant pays rent
    await expect(lease.connect(tenant).payRent({ value: rent }))
      .to.emit(lease, "RentPaid")
      .withArgs(tenant.address, rent);
  });

  it("should emit LeaseTerminated event when lease is terminated", async function () {
    // Terminate the lease as landlord
    await expect(lease.connect(landlord).terminateLease())
      .to.emit(lease, "LeaseTerminated")
      .withArgs(landlord.address);
  });
});
