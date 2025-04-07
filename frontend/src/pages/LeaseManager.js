import React, { useEffect, useState } from "react";
import { fetchLeaseDetails, setLeaseDetails } from "../contracts/leaseContract";
import { ethers } from "ethers";

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
      const provider = new ethers.BrowserProvider(window.ethereum, "any");
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
      const provider = new ethers.BrowserProvider(window.ethereum, "any");
      const signer = await provider.getSigner();

      // Validate tenant address
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

      // Parse rent and deposit
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
      alert("Error setting lease: " + (err?.message || "Unknown error"));
    }
  };

  useEffect(() => {
    const now = new Date();
    const later = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later

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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Lease</h2>

      {lease && (
        <div className="mb-6 bg-white shadow p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">Current Lease Info:</h3>
          <pre className="text-sm">{JSON.stringify(lease, null, 2)}</pre>
        </div>
      )}

      <div className="bg-white shadow p-4 rounded space-y-4">
        <h3 className="font-semibold text-lg">Update Lease Details</h3>
        <input
          name="tenant"
          type="text"
          placeholder="Tenant address"
          value={form.tenant}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="rent"
          type="number"
          step="0.01"
          placeholder="Rent (in ETH)"
          value={form.rent}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="deposit"
          type="number"
          step="0.01"
          placeholder="Deposit (in ETH)"
          value={form.deposit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="start"
          type="datetime-local"
          value={form.start}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="end"
          type="datetime-local"
          value={form.end}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSetLease}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Set Lease
        </button>
      </div>
    </div>
  );
}

export default LeaseManager;
