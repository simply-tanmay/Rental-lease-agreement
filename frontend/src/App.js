import React, { useEffect } from "react";
import { getLeaseContract } from "./LeaseContract";

function App() {
  useEffect(() => {
    async function initContract() {
      const leaseContract = getLeaseContract();
      if (leaseContract) {
        // Now you can call functions on your contract, e.g.,
        const landlord = await leaseContract.landlord();
        console.log("Landlord:", landlord);
      }
    }
    initContract();
  }, []);

  return (
    <div>
      <h1>Lease Agreement System</h1>
    </div>
  );
}

export default App;
