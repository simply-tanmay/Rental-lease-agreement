import React, { useEffect, useState } from "react";
import { fetchLeaseDetails, setLeaseDetails } from "../contracts/leaseContract";
import { ethers } from "ethers";
import StarryBackground from "../components/StarryBackground";
import Parallax from "../components/Parallax";

function LeaseManager() {
  const [lease, setLease] = useState(null);
  const [form, setForm] = useState({
    tenant: "",
    rent: "",
    deposit: "",
    start: "",
    end: ""
  });

  const loadLease = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum, {
        chainId: 31337,
        name: "hardhat"
      });
      const data = await fetchLeaseDetails(provider);
      setLease(data);
    } catch (err) {
      console.error("Failed to fetch lease:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSetLease = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum, {
        chainId: 31337,
        name: "hardhat"
      });
      const signer = await provider.getSigner();

      const tenantAddress = form.tenant.trim();
      if (!ethers.isAddress(tenantAddress)) {
        alert("Invalid Ethereum address format for tenant");
        return;
      }

      if (!form.start || !form.end) {
        alert("Please select both lease start and end date & time.");
        return;
      }

      const startDate = new Date(form.start);
      const endDate = new Date(form.end);

      const startTimestamp = Math.floor(startDate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);

      if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
        alert("Invalid lease start or end date");
        return;
      }

      if (startTimestamp >= endTimestamp) {
        alert("Lease start must be before lease end");
        return;
      }

      const rentWei = ethers.parseEther(form.rent.toString());
      const depositWei = ethers.parseEther(form.deposit.toString());

      await setLeaseDetails(
        signer,
        tenantAddress,
        rentWei,
        depositWei,
        startTimestamp,
        endTimestamp
      );

      alert("Lease details updated");
      loadLease();
    } catch (err) {
      console.error("Error setting lease:", err);
      // User-friendly error handling
      let message = "An error occurred while setting the lease.";
      if (err?.reason) {
        message = err.reason;
      } else if (err?.error?.message) {
        // ethers v5 style
        message = err.error.message;
      } else if (err?.message && err.message.includes('Only landlord can set lease details')) {
        message = "Only the landlord can update lease details.";
      } else if (err?.message) {
        // Try to extract revert reason from message
        const match = err.message.match(/execution reverted: ([^"]+)/);
        if (match && match[1]) {
          message = match[1];
        } else {
          message = err.message;
        }
      }
      alert(message);
    }
  };

  useEffect(() => {
    const now = new Date();
    const later = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const toLocalInputFormat = (date) =>
      new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    setForm((prev) => ({
      ...prev,
      start: toLocalInputFormat(now),
      end: toLocalInputFormat(later)
    }));

    loadLease();
  }, []);

  return (
    <div className="parallax-container">
      <StarryBackground />
      
      <Parallax speed={0.2}>
        <div className="container">
          <h1 className="text-4xl font-bold mb-8 text-center">Lease Management</h1>
          
          {lease && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Current Lease Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Landlord</p>
                  <p className="font-mono">{lease.landlord}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tenant</p>
                  <p className="font-mono">{lease.tenant}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rent Amount</p>
                  <p>{lease.rentAmount} ETH</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Security Deposit</p>
                  <p>{lease.securityDeposit} ETH</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lease Start</p>
                  <p>{new Date(lease.leaseStart * 1000).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lease End</p>
                  <p>{new Date(lease.leaseEnd * 1000).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Update Lease Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <label htmlFor="tenant">Tenant Address</label>
                <input
                  id="tenant"
                  name="tenant"
                  type="text"
                  placeholder="0x..."
                  value={form.tenant}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="rent">Rent Amount (ETH)</label>
                <input
                  id="rent"
                  name="rent"
                  type="number"
                  step="0.01"
                  placeholder="1.0"
                  value={form.rent}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="deposit">Security Deposit (ETH)</label>
                <input
                  id="deposit"
                  name="deposit"
                  type="number"
                  step="0.01"
                  placeholder="2.0"
                  value={form.deposit}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="start">Lease Start</label>
                <input
                  id="start"
                  name="start"
                  type="datetime-local"
                  value={form.start}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="end">Lease End</label>
                <input
                  id="end"
                  name="end"
                  type="datetime-local"
                  value={form.end}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleSetLease}
                className="button"
              >
                Update Lease
              </button>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default LeaseManager;