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

    constructor(address _tenant, uint256 _rentAmount, uint256 _securityDeposit, uint256 _leaseDuration) {
        landlord = msg.sender;
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        leaseStart = block.timestamp;
        leaseEnd = block.timestamp + _leaseDuration;
        isActive = true;
    }

    function payRent() public payable {
        require(msg.sender == tenant, "Only the tenant can pay rent");
        require(msg.value == rentAmount, "Incorrect rent amount");
        require(isActive, "Lease agreement is not active");

        payable(landlord).transfer(msg.value);
    }

    function terminateLease() public {
        require(msg.sender == landlord || msg.sender == tenant, "Only landlord or tenant can terminate");
        isActive = false;
    }
}
