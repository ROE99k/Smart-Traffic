import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VehicleDashboard() {
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchCount = () => {
      axios.get("http://localhost:5000/get-vehicle-count")
        .then(res => {
          setVehicleCount(res.data.vehicle_count);
        })
        .catch(err => {
          console.error("Error fetching vehicle count:", err);
        });
    };

    fetchCount(); // Fetch once
    const interval = setInterval(fetchCount, 2000); // Refresh every 2 sec

    return () => clearInterval(interval); // Clean up
  }, []);

  return (
    <div>
      <h2>Live Vehicle Count</h2>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{vehicleCount}</p>
    </div>
  );
}

export default VehicleDashboard; 