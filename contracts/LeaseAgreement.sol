// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LeaseAgreement {
    address public landlord;
    address public tenant;
    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public leaseStart;
    uint256 public leaseEnd;
    bool public isActive;

    // Declare events
    event LeaseSigned(address indexed landlord, address indexed tenant, uint256 rentAmount, uint256 leaseEnd);
    event RentPaid(address indexed tenant, uint256 amount);
    event LeaseTerminated(address indexed terminatedBy);

    constructor(
        address _tenant, 
        uint256 _rentAmount, 
        uint256 _securityDeposit, 
        uint256 _leaseDuration
    ) {
        landlord = msg.sender;
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        leaseStart = block.timestamp;
        leaseEnd = block.timestamp + _leaseDuration;
        isActive = true;
    }

    // Tenant signs the lease by sending the security deposit
    function signLease() external payable {
        require(msg.sender == tenant, "Only tenant can sign the lease");
        require(msg.value == securityDeposit, "Incorrect security deposit");
        emit LeaseSigned(landlord, tenant, rentAmount, leaseEnd);
    }

    // Tenant pays the rent
    function payRent() external payable {
        require(msg.sender == tenant, "Only tenant can pay rent");
        require(msg.value == rentAmount, "Incorrect rent amount");
        payable(landlord).transfer(msg.value);
        emit RentPaid(tenant, msg.value);
    }

    // Either party can terminate the lease
    function terminateLease() external {
        require(msg.sender == landlord || msg.sender == tenant, "Unauthorized");
        isActive = false;
        emit LeaseTerminated(msg.sender);
    }
}
