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
    event LeaseDetailsUpdated(uint256 newRentAmount, uint256 newSecurityDeposit, uint256 newLeaseStart, uint256 newLeaseEnd);

    constructor(
    address _landlord,
    address _tenant,
    uint256 _rentAmount,
    uint256 _securityDeposit,
    uint256 _leaseStart,
    uint256 _leaseEnd
) {
    landlord = _landlord;
    tenant = _tenant;
    rentAmount = _rentAmount;
    securityDeposit = _securityDeposit;
    leaseStart = _leaseStart;
    leaseEnd = _leaseEnd;
    isActive = true; 
}


    // Landlord sets lease details
    function setLeaseDetails(
        address _tenant, 
        uint256 _rentAmount, 
        uint256 _securityDeposit, 
        uint256 _leaseStart, 
        uint256 _leaseEnd
    ) external {
        require(msg.sender == landlord, "Only landlord can set lease details");
        require(_leaseStart < _leaseEnd, "Lease start must be before lease end");
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        leaseStart = _leaseStart;
        leaseEnd = _leaseEnd;
        isActive = true;
        emit LeaseDetailsUpdated(rentAmount, securityDeposit, leaseStart, leaseEnd);
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
